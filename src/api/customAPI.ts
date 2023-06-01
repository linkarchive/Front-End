/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const setInterceptors = (instance: AxiosInstance, accessToken?: string) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const createInstance = (accessToken?: string) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
  });

  setInterceptors(instance, accessToken);

  return instance;
};

export const clientInstance = createInstance();
