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

  getUrlMetadata: async (link: string) => {
    const response = await authInstance.get(`link/metadata`, {
      params: {
        link,
      },
      timeout: 5000,
    });
    return response;
  },

  createLink: async (data: {
    url: string;
    title: string;
    description: string;
    thumbnail: string;
    tag: string[];
  }) => {
    const response = await authInstance.post(`link`, {
      ...data,
    });
    return response;
  },

  getLinksArchive: async (linkId?: string) => {
    const response = await defaultInstance.get(`links/archive/public?linkId=${linkId}`);
    return response;
  },

  getAuthLinksArchive: async (linkId?: string) => {
    const response = await authInstance.get(`links/archive/authentication?linkId=${linkId}`);
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

  updateNickname: async (nickname: string, userId: string) => {
    const response = await authInstance.patch(`/user/${userId}/nickname`, {
      nickname,
    });
    return response;
  },

  validateNickname: async (nickname: string) => {
    const response = await defaultInstance.post(`/nickname`, {
      nickname,
    });
    return response;
  },
};

export default API;
