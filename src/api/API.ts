import { AxiosResponse } from 'axios';
import { authInstance, createInstance, defaultInstance } from './customAPI';
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

  getUserProfile: async (token?: string, userId?: string) => {
    let instance;
    if (token) {
      // 서버사이드에서 토큰을 직접 사용
      instance = createInstance(token);
    } else {
      // 클라이언트사이드에서는 인터셉터가 토큰을 설정
      instance = authInstance;
    }

    // userId 값에 따라 endpoint를 다르게 설정
    const endpoint = userId ? `user/${userId}` : 'user';
    const response = await instance.get(endpoint);

    return response;
  },

  updateUserProfile: async (name: string, intro: string) => {
    const response = await authInstance.patch('user', {
      name,
      intro,
    });
    return response;
  },
};

export default API;
