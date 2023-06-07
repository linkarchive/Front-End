/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { clientInstance, nextInstance } from './customAPI';
import { KakaoType } from './types';

const API = {
  /** NEXT api 쿠키 저장, 삭제 */
  setAllCookies: async (data): Promise<AxiosResponse> => {
    const response = await nextInstance.post(`set-all-cookies`, data);
    return response;
  },

  setCookie: async ({ name, value }: { name: string; value: string }): Promise<AxiosResponse> => {
    const response = await nextInstance.post(`set-cookie`, { name, value });
    return response;
  },

  deleteAllCookies: async (): Promise<AxiosResponse> => {
    const response = await nextInstance.post(`delete-all-cookies`);
    return response;
  },

  getRefreshToken: async (): Promise<AxiosResponse> => {
    const response = await nextInstance.get(`get-refresh-token`);
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
    const { data } = await clientInstance.get(`link/metadata`, {
      params: {
        url,
      },
      timeout: 5000,
    });
    return data;
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
    const { data } = await clientInstance.get(`links/archive/public`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  getAuthLinksArchive: async (linkId?: string) => {
    const { data } = await clientInstance.get(`links/archive/authentication`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 사용자별 링크 둘러보기 */
  getLinksArchiveByUserId: async ({ nickname, linkId }: { nickname: string; linkId?: string }) => {
    const { data } = await clientInstance.get(`links/public/user/${nickname}`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  getAuthLinksArchiveByUserId: async ({
    nickname,
    linkId,
  }: {
    nickname: string;
    linkId?: string;
  }) => {
    const { data } = await clientInstance.get(`links/authentication/user/${nickname}`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 사용자별 북마크 둘러보기 */
  getMarksArchiveByUserId: async ({ nickname, linkId }: { nickname: string; linkId?: string }) => {
    const { data } = await clientInstance.get(`mark/links/public/user/${nickname}`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  getAuthMarksArchiveByUserId: async ({
    nickname,
    linkId,
  }: {
    nickname: string;
    linkId?: string;
  }) => {
    const { data } = await clientInstance.get(`mark/links/authentication/user/${nickname}`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 내 링크 둘러보기 */
  getUserLinksArchive: async (linkId?: string) => {
    const { data } = await clientInstance.get(`links/user`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 내 마크 둘러보기 */
  getUserMarksArchive: async (linkId?: string) => {
    const { data } = await clientInstance.get(`mark/links/user`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 북마크 */
  createMark: async (linkId: number) => {
    const { data } = await clientInstance.post(`mark/link/${linkId}`);
    return data;
  },

  /** 북마크 취소 */
  deleteMark: async (linkId: number) => {
    const { data } = await clientInstance.delete(`mark/link/${linkId}`);
    return data;
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

  uploadImage: async ({ file }: { file: File }): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await clientInstance.patch(`profile-image`, formData);
    return response;
  },

  getMyProfile: async () => {
    const response = await clientInstance.get(`user`);
    return response.data;
  },

  getUserProfile: async (nickname: string) => {
    const { data } = await clientInstance.get(`user/${nickname}`);
    return data;
  },

  updateUserProfile: async ({ nickname, introduce }: { nickname: string; introduce: string }) => {
    const response = await clientInstance.patch('user', {
      nickname,
      introduce,
    });
    return response.data;
  },

  updateNickname: async ({ nickname, userId }: { nickname: string; userId: string }) => {
    const response = await clientInstance.patch(`/user/${userId}/nickname`, {
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

  getNewAccessToken: async (refreshToken: string) => {
    const response = await clientInstance.post(`/publish/access-token`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response;
  },
};

export default API;
