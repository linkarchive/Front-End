import { AxiosResponse } from 'axios';
import { defaultInstance } from './customAPI';
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

  urlMetadata: async (url: string) => {
    const response = await defaultInstance.get(`link/metadata`, {
      params: {
        url,
      },
    });
    return response;
  },
};

export default API;
