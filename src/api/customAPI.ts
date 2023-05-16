/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const token = 'my token'; // 토큰은 저장하면 로직을 바꾸도록 할게요

const setInterceptors = (instance: AxiosInstance) => {
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
    (request) => {
      console.log('interceptor > request', request);
      return request;
    },
    (error) => {
      console.log('interceptor > error', error);
      return Promise.reject(error);
    }
  );
};

const createInstance = (headers?: any) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
    headers,
  });
  setInterceptors(instance);
  return instance;
};

const axiosApi = () => {
  return createInstance();
};

const axiosAuthApi = () => {
  return createInstance({ token });
};

const axiosFormDataApi = () => {
  return createInstance({ token, 'Content-Type': 'multipart/form-data' });
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
export const authFormDataInstance = axiosFormDataApi();
