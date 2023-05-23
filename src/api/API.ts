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
    const response = await authInstance.get(`link/metadata`, {
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

  getLinksArchive: async (linkId?: string) => {
    const response = await authInstance.get(`links/archive`, { params: { linkId } });
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
    formData.append('image', file);

    const response = await authInstance.patch(`profile-image`, formData);
    return response;
  },

  getMyProfile: async () => {
    const response = await authInstance.get(`user`);
    return response;
  },

  getUserProfile: async (userId: number) => {
    const response = await defaultInstance.get(`user/${userId}`);
    return response;
  },

  updateUserProfile: async (name: string, introduce: string) => {
    const response = await authInstance.patch('user', {
      name,
      introduce,
    });
    return response;
  },
};

export default API;
