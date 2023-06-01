/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { createInstance, clientInstance } from './customAPI';
import { KakaoType } from './types';

const API = {
  sample: async (params: string): Promise<AxiosResponse> => {
    const response = await clientInstance.get(`sample`, {
      params,
    });
    return response;
  },

  kakaoLogin: async ({ code }: KakaoType): Promise<AxiosResponse> => {
    const response = await clientInstance.post(`auth/kakao`, null, {
      params: {
        code,
      },
    });
    return response;
  },

  getLinkMetadata: async (url: string) => {
    const response = await clientInstance.get(`link/metadata`, {
      params: {
        url,
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
    tags: string[];
  }) => {
    const response = await clientInstance.post(`link`, {
      ...data,
    });
    return response;
  },

  /** 링크 둘러보기 */
  getLinksArchive: async (linkId?: string) => {
    const response = await clientInstance.get(`links/archive/public`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthLinksArchive: async (linkId?: string) => {
    const response = await clientInstance.get(`links/authentication`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 사용자별 링크 둘러보기 */
  getLinksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await clientInstance.get(`links/public/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthLinksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await clientInstance.get(`links/authentication/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 사용자별 북마크 둘러보기 */
  getMarksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await clientInstance.get(`mark/links/public/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthMarksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await clientInstance.get(`mark/links/authentication/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 내 링크 둘러보기 */
  getUserLinksArchive: async (linkId?: string) => {
    const response = await clientInstance.get(`links/user`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 내 마크 둘러보기 */
  getUserMarksArchive: async (linkId?: string) => {
    const response = await clientInstance.get(`mark/links/user`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  createTag: async (tag: string) => {
    const response = await clientInstance.post(`tag`, {
      tag,
    });
    return response;
  },

  getTagsByUserId: async (userId: string) => {
    const response = await clientInstance.get(`tags/userId${userId}`);
    return response;
  },

  uploadImage: async (file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await clientInstance.patch(`profile-image`, formData);
    return response;
  },

  getMyProfile: async ({ accessToken }: { accessToken: string }) => {
    const serverInstance = createInstance(accessToken);
    const response = await serverInstance.get(`user`);
    return response.data;
  },

  getUserProfile: async (userId: number) => {
    const response = await clientInstance.get(`user/${userId}`);
    return response;
  },

  updateUserProfile: async ({ nickname, introduce }: { nickname: string; introduce: string }) => {
    const response = await clientInstance.patch('user', {
      nickname,
      introduce,
    });
    return response.data;
  },

  updateNickname: async ({
    nickname,
    userId,
    accessToken,
  }: {
    nickname: string;
    userId: string;
    accessToken: string;
  }) => {
    const serverInstance = createInstance(accessToken);
    const response = await serverInstance.patch(`/user/${userId}/nickname`, {
      nickname,
    });
    return response;
  },

  validateNickname: async (nickname: string) => {
    const response = await clientInstance.post(`/nickname`, {
      nickname,
    });
    return response.data;
  },
};

export default API;
