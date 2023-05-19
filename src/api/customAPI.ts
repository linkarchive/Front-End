/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let accessToken;
// 브라우저에서만 사용할 수 있도록 하였음 next.config.js의 이슈
if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken');
}

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
    headers: headers && {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  setInterceptors(instance);
  return instance;
};

const axiosApi = () => {
  return createInstance();
};

const axiosAuthApi = () => {
  return createInstance({ accessToken });
};

const axiosFormDataApi = () => {
  return createInstance({ accessToken, 'Content-Type': 'multipart/form-data' });
};

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();
export const authFormDataInstance = axiosFormDataApi();
