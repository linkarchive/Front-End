import { AxiosResponse } from 'axios';
import { instance } from './customAPI';
import { KakaoType } from './types';

const API = {
  sample: async (params: string): Promise<AxiosResponse> => {
    const response = await instance.get(`sample`, {
      params,
    });
    return response;
  },

  kakaoLogin: async ({ code }: KakaoType): Promise<AxiosResponse> => {
    const response = await instance.post(`auth/kakao`, null, {
      params: {
        code,
      },
    });
    return response;
  },

  getLinkMetadata: async (url: string) => {
    const response = await instance.get(`link/metadata`, {
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
    const response = await instance.post(`link`, {
      ...data,
    });
    return response;
  },

  /** 링크 둘러보기 */
  getLinksArchive: async (linkId?: string) => {
    const response = await instance.get(`links/archive/public`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthLinksArchive: async (linkId?: string) => {
    const response = await instance.get(`links/authentication`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 사용자별 링크 둘러보기 */
  getLinksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await instance.get(`links/public/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthLinksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await instance.get(`links/authentication/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 사용자별 북마크 둘러보기 */
  getMarksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await instance.get(`mark/links/public/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  getAuthMarksArchiveByUserId: async ({ userId, linkId }: { userId: string; linkId?: string }) => {
    const response = await instance.get(`mark/links/authentication/user/${userId}`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 내 링크 둘러보기 */
  getUserLinksArchive: async (linkId?: string) => {
    const response = await instance.get(`links/user`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  /** 내 마크 둘러보기 */
  getUserMarksArchive: async (linkId?: string) => {
    const response = await instance.get(`mark/links/user`, {
      params: {
        linkId,
      },
    });
    return response;
  },

  createTag: async (tag: string) => {
    const response = await instance.post(`tag`, {
      tag,
    });
    return response;
  },

  getTagsByUserId: async (userId: string) => {
    const response = await instance.get(`tags/userId${userId}`);
    return response;
  },

  uploadImage: async (file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await instance.patch(`profile-image`, formData);
    return response;
  },

  getMyProfile: async () => {
    const response = await instance.get(`user`);
    return response;
  },

  getUserProfile: async (userId: number) => {
    const response = await instance.get(`user/${userId}`);
    return response;
  },

  updateUserProfile: async (name: string, introduce: string) => {
    const response = await instance.patch('user', {
      name,
      introduce,
    });
    return response;
  },

  updateNickname: async ({ nickname, userId }: { nickname: string; userId: string }) => {
    const response = await instance.patch(`/user/${userId}/nickname`, {
      nickname,
    });
    return response;
  },

  validateNickname: async (nickname: string) => {
    const response = await instance.post(`/nickname`, {
      nickname,
    });
    return response;
  },
};

export default API;
