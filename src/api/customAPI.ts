/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN } from '@/constants';
import { getCookie } from '@/utils';
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const setInterceptors = (instance: AxiosInstance, serverAccessToken?: string) => {
  instance.interceptors.response.use(
    (response) => {
      console.log('interceptor > response', response);
      return response;
    },
    (error) => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.request.use(
    (config) => {
      const accessToken = serverAccessToken || getCookie(ACCESS_TOKEN);
      console.log('interceptor > request', config);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },

    (error) => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );
};

export const createInstance = (serverAccessToken?: string) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
  });
  setInterceptors(instance, serverAccessToken);
  return instance;
};

export const instance = createInstance();
