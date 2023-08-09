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
  getTrashedLinks: async ({ linkId, tagId }: { linkId?: number; tagId?: number }) => {
    const { data } = await clientInstance.get(`/links/trash`, {
      params: {
        linkId,
        tagId,
      },
    });
    return data;
  },

  /** 링크 삭제 */
  // TODO

  /** 링크 둘러보기 */
  getLinksArchive: async ({ linkId, tagId }: { linkId: number; tagId: number }) => {
    const { data } = await clientInstance.get(`links/archive`, {
      params: {
        linkId,
        tagId,
      },
    });
    return data;
  },

  /** 사용자별 링크 둘러보기 */
  getLinksArchiveByUserId: async ({
    userId,
    linkId,
    tagId,
  }: {
    userId: number;
    linkId?: number;
    tagId?: number;
  }) => {
    const { data } = await clientInstance.get(`links/user/${userId}`, {
      params: {
        linkId,
        tagId,
      },
    });
    return data;
  },

  /** 사용자별 북마크 둘러보기 */
  getMarksArchiveByUserId: async ({
    userId,
    markId,
    tagId,
  }: {
    userId: number;
    markId?: number;
    tagId?: number;
  }) => {
    const { data } = await clientInstance.get(`mark/links/user/${userId}`, {
      params: {
        markId,
        tagId,
      },
    });
    return data;
  },

  /** 내 링크 둘러보기 */
  getUserLinksArchive: async (linkId: number, tagId?: number) => {
    const { data } = await clientInstance.get(`links/user`, {
      params: {
        linkId,
        tagId,
      },
    });
    return data;
  },

  /** 내 마크 둘러보기 */
  getUserMarksArchive: async (markId: number, tagId?: number) => {
    const { data } = await clientInstance.get(`mark/links/user`, {
      params: {
        markId,
        tagId,
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
   * @param userId 조회할 사용자 닉네임
   * @param size 조회할 해시태그 수
   */
  getTagsByUserId: async ({ userId }: { userId: number }) => {
    const { data } = await clientInstance.get(`tags/user/${userId}`);

    return data;
  },

  /** 프로필 이미지 수정 */
  uploadImage: async ({ file }: { file: File }): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await clientInstance.patch(`profile-image`, formData);
    return response;
  },

  /** 본인 프로필 페이지 조회 */
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

  /** 유저 프로필 조회 */
  getUserProfile: async (userId: number) => {
    const { data } = await clientInstance.get(`user/${userId}`);

    return data;
  },

  /** 프로필 수정 */
  updateUserProfile: async ({ nickname, introduce }: { nickname: string; introduce: string }) => {
    const response = await clientInstance.patch('user', {
      nickname,
      introduce,
    });

    return response.data;
  },

  /** 닉네임 수정 */
  updateNickname: async ({ nickname, userId }: { nickname: string; userId: number }) => {
    const response = await clientInstance.patch(`/user/${userId}/nickname`, {
      nickname,
    });

    return response;
  },

  /** 닉네임 검증 */
  validateNickname: async (nickname: string) => {
    const response = await clientInstance.post(`/nickname`, {
      nickname,
    });

    return response.data;
  },

  /** 엑세스 토큰 재발급 */
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

  /** 사용자별 자주 사용하는 링크 해시태그 리스트 조회 */
  getUsersTagList: async (userId: number) => {
    const { data } = await clientInstance.get(`/tags/user/${userId}`);

    return data.tagList;
  },

  /** 사용자별 자주 사용하는 링크 해시태그 리스트 조회 */
  getUsersLinksTagList: async (userId: number) => {
    const { data } = await clientInstance.get(`/links/tags/user/${userId}`);

    return data.tagList;
  },

  /** 사용자별 마크 해시태그 리스트 조회 */
  getUsersMarksTagList: async (userId: number) => {
    const { data } = await clientInstance.get(`/mark/tags/user/${userId}`);

    return data.tagList;
  },

  /** 둘러보기 해시태그 리스트 조회 */
  getArchiveTagList: async () => {
    const { data } = await clientInstance.get(`/tags/archive`);

    return data.tagList;
  },

  /** 팔로우 요청 */
  followUser: async (followeeId: number) => {
    const { data } = await clientInstance.post(`/follow/user/${followeeId}`);

    return data;
  },

  /** 언팔로우 요청 */
  unFollowUser: async (followeeId: number) => {
    const { data } = await clientInstance.delete(`/unfollow/user/${followeeId}`);

    return data;
  },

  /** 팔로워 리스트 조회 */
  getFollowerList: async (userId: number) => {
    const { data } = await clientInstance.get(`/follower-list/user/${userId}`);

    return data;
  },

  /** 팔로잉 리스트 조회 */
  getFollowingList: async (userId: number) => {
    const { data } = await clientInstance.get(`/following-list/user/${userId}`);

    return data;
  },
};

export default API;
