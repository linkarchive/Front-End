/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from '@/utils';
import API from './API';
import Router from 'next/router';

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

const refreshToken = async (oError) => {
  try {
    const { response } = oError;

    // create new Promise to retry original request
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers.Authorization = `Bearer ${token}`;
        resolve(axios(response!.config));
      });
    });
    console.log('hi');
    console.log(fetchingToken);
    if (!fetchingToken) {
      fetchingToken = true;

      // refresh token
      const { data } = await API.getRefreshToken();
      // const res = await API.getNewAccessToken(data.refreshToken);
      const res = await API.getNewAccessToken(data.refreshToken);
      console.log('!!', data.refreshToken, res);
      // check if this is server or not. We don't wanna save response token on server.
      if (!isServer) {
        setAccessToken(res.data.accessToken);
      }
      await API.setCookie({ name: 'accessToken', value: res.data.accessToken });
      // when new token arrives, retry old requests
      onAccessTokenFetched(res.data.accessToken);
    }
    return retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    if (!isServer() && !Router.asPath.includes('/login')) {
      Router.push('/login');
    }
    if (isServer()) {
      context.res.setHeader('location', '/login');
      context.res.statusCode = 302;
      context.res.end();
    }
    return Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data.code === 'INVALID_TOKEN') {
        return refreshToken(error);
      }
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
