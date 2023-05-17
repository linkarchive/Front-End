import { AxiosResponse } from 'axios';
import { authInstance, defaultInstance } from './customAPI';
import { KakaoType } from './types';

const API = {
  sample: async (params: string): Promise<AxiosResponse> => {
    const response = await defaultInstance.get(`sample`, {
      params,
    });
    return response;
  },

  kakaoLogin: async ({ code }: KakaoType): Promise<AxiosResponse> => {
    const response = await defaultInstance.post(`auth/kakao`, null, {
      params: {
        code,
      },
    });
    return response;
  },

  getUrlMetadata: async (url: string) => {
    const response = await defaultInstance.get(`link/metadata`, {
      params: {
        url,
      },
    });
    return response;
  },

  createLink: async (data: {
    title: string;
    link: string;
    thumbnail: string;
    tagList: string[];
  }) => {
    const response = await defaultInstance.post(`link/metadata`, {
      data,
    });
    return response;
  },

  createTag: async (tag: string) => {
    const response = await defaultInstance.post(`tag`, {
      tag,
    });
    return response;
  },

  getTagsByUserId: async (userId: string) => {
    const response = await defaultInstance.get(`tags/userId${userId}`);
    return response;
  },

  uploadImage: async (file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await defaultInstance.post(`profileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};

export default API;
