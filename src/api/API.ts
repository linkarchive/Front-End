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

  getLinkMetadata: async (link: string) => {
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
    const response = await authInstance.get(`links/archive?linkId=${linkId}`); // await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/links/${urlId}`); // TODO 목업 API  /** 실제 리소스 ?urlId=${urlId} */
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

  getUserProfile: async (userId: string, token?: string) => {
    let instance;
    if (token) {
      // 서버사이드에서 토큰을 직접 사용
      instance = createInstance(token);
    } else {
      // 클라이언트사이드에서는 인터셉터가 토큰을 설정
      instance = authInstance;
    }
    const response = await instance.get(`user/${userId}`);
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
