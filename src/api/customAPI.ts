/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from '@/utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
let context: GetServerSidePropsContext;
let accessToken: string;

export const setAccessToken = (accessToken_: string) => {
  accessToken = accessToken_;
};

export const getAccessToken = () => accessToken;

export const setContext = (context_: GetServerSidePropsContext) => {
  context = context_;
  setAccessToken(parseCookies(context.req.headers.cookie).accessToken);
};

export const getContext = () => context;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
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
