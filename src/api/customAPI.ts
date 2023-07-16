/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from '@/utils';
import API from './API';

const isServer = () => {
  return typeof window === 'undefined';
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
let context: GetServerSidePropsContext;
let accessToken: string;
let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

export const setAccessToken = (accessToken_: string) => {
  accessToken = accessToken_;
};

export const getAccessToken = () => accessToken;

export const setContext = (context_: GetServerSidePropsContext) => {
  context = context_;
  setAccessToken(parseCookies(context.req.headers.cookie).accessToken);
};

export const getContext = () => context;

const getNewAccessToken = async (error) => {
  try {
    const { response } = error;

    // 큐에 밀어 넣기
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });
    if (!fetchingToken) {
      fetchingToken = true;

      const { refreshToken } = await API.getRefreshToken();
      const token = getAccessToken();
      const res = await API.getNewAccessToken({
        refreshToken,
        accessToken: token,
      });
      if (!isServer) {
        setAccessToken(res.data.accessToken);
      }
      await API.setCookie({ name: 'accessToken', value: res.data.accessToken });
      // 새로운 토큰을 발급받으면 요청 재시도
      onAccessTokenFetched(res.data.accessToken);
    }

    return retryOriginalRequest;
  } catch (err) {
    // 그래도 에러나면 쿠키&큐 비우고 로그인페이지로 이동
    await API.deleteAllCookies();
    subscribers = [];
    window.location.href = '/login';

    return Promise.reject(err);
  } finally {
    fetchingToken = false;
  }
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data.code === 'INVALID_TOKEN') {
        return getNewAccessToken(error);
      }
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    (config) => {
      if (config.url !== '/publish/access-token') {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

export const createInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
  });
  setInterceptors(instance);

  return instance;
};

export const createNextInstance = () => {
  const instance = axios.create({
    baseURL: '/api/',
    timeout: 2000,
  });

  setInterceptors(instance);
  return instance;
};

export const clientInstance = createInstance();
export const nextInstance = createNextInstance();
