/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { clientInstance, nextInstance } from './customAPI';
import { KakaoType } from './types';
import { createSource } from '@/utils/cancelToken';

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

  getRefreshToken: async (): Promise<any> => {
    const { data } = await nextInstance.get(`refresh-token`);
    return data;
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

  /** 링크 추가 */
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

  /** 링크 임시 삭제 */
  deleteLinkTemp: async (id: number) => {
    const { data } = await clientInstance.patch(`link/${id}`);
    return data;
  },

  /** 임시 삭제 보관함 조회 */
  getTrashedLinks: async ({ linkId, tag }: { linkId?: string; tag?: string }) => {
    const { data } = await clientInstance.get(`/links/trash`, {
      params: {
        linkId,
        tag,
      },
    });
    return data;
  },

  /** 링크 삭제 */
  // TODO

  /** 링크 둘러보기 */
  getLinksArchive: async (linkId?: string) => {
    const { data } = await clientInstance.get(`links/archive`, {
      params: {
        linkId,
      },
    });
    return data;
  },

  /** 사용자별 링크 둘러보기 */
  getLinksArchiveByUserId: async ({
    nickname,
    linkId,
    tag,
  }: {
    nickname: string;
    linkId?: string;
    tag?: string;
  }) => {
    const { data } = await clientInstance.get(`links/user/${nickname}`, {
      params: {
        linkId,
        tag,
      },
    });
    return data;
  },

  /** 사용자별 북마크 둘러보기 */
  getMarksArchiveByUserId: async ({
    nickname,
    markId,
    tag,
  }: {
    nickname: string;
    markId?: string;
    tag?: string;
  }) => {
    const { data } = await clientInstance.get(`mark/links/user/${nickname}`, {
      params: {
        markId,
        tag,
      },
    });
    return data;
  },

  /** 내 링크 둘러보기 */
  getUserLinksArchive: async (linkId: string, tag?: string) => {
    const { data } = await clientInstance.get(`links/user`, {
      params: {
        linkId,
        tag,
      },
    });
    return data;
  },

  /** 내 마크 둘러보기 */
  getUserMarksArchive: async (markId: string, tag?: string) => {
    const { data } = await clientInstance.get(`mark/links/user`, {
      params: {
        markId,
        tag,
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

  /** 태그 등록 */
  createTag: async (tag: string) => {
    const { data } = await clientInstance.post(`tag`, {
      tag,
    });
    return { data };
  },

  /**
   * 사용자 해시태그 리스트
   * @param usernickname 조회할 사용자 닉네임
   * @param size 조회할 해시태그 수
   */
  getTagsByNickname: async ({ usernickname, size }: { usernickname: string; size?: number }) => {
    const { data } = size
      ? await clientInstance.get(`limited-tags/user/${usernickname}?size=${size}`)
      : await clientInstance.get(`tags/user/${usernickname}`);
    return data;
  },

  uploadImage: async ({ file }: { file: File }): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await clientInstance.patch(`profile-image`, formData);
    return response;
  },

  getMyProfile: async () => {
    const source = createSource();
    try {
      const response = await clientInstance.get('user', {
        cancelToken: source.token,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return null;
      }
      throw error;
    }
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

  getNewAccessToken: async ({
    refreshToken,
    accessToken,
  }: {
    refreshToken: string;
    accessToken: string;
  }) => {
    const response = await clientInstance.post(
      `/publish/access-token`,
      { accessToken: `Bearer ${accessToken}` },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response;
  },

  /** 사용자별 해시태그 리스트 조회 */
  getUsersLinksTagList: async (nickname: string) => {
    const { data } = await clientInstance.get(`/tags/user/${nickname}`);

    return data.tagList;
  },

  getUsersMarksTagList: async (nickname: string) => {
    const { data } = await clientInstance.get(`/mark/tags/user/${nickname}`);

    return data.tagList;
  },

  /** 팔로우/언팔로우 요청 */
  followUser: async (followeeId: string) => {
    const { data } = await clientInstance.post(`/follow/${followeeId}`);

    return data;
  },

  unFollowUser: async (followeeId: string) => {
    const { data } = await clientInstance.delete(`/unfollow/${followeeId}`);

    return data;
  },

  /** 팔로워 리스트 조회 */
  getFollowerList: async (userId: string | number) => {
    const { data } = await clientInstance.get(`/follower-list/user/${userId}`);

    return data;
  },

  /** 팔로잉 리스트 조회 */
  getFollowingList: async (userId: string | number) => {
    const { data } = await clientInstance.get(`/following-list/user/${userId}`);

    return data;
  },
};

export default API;
