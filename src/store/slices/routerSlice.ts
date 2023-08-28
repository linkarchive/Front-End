import { createSlice } from '@reduxjs/toolkit';

interface RouterState {
  status: string;
  current: string;
  name: string;
  isEllipsis: boolean;
}

const initialState: RouterState = {
  status: 'MAIN',
  current: 'HOME',
  name: '',
  isEllipsis: false,
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    loadLoginPage(state) {
      state.status = 'OTHER';
      state.current = 'LOGIN_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadNicknamePage(state) {
      state.status = 'OTHER';
      state.current = 'NICKNAME_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadArchivePage(state) {
      state.status = 'MAIN';
      state.current = 'ARCHIVE_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadArchiveUser(state) {
      state.status = 'OTHER';
      state.current = 'ARCHIVE_USER';
      state.name = '';
      state.isEllipsis = true;
    },

    loadHomePage(state) {
      state.status = 'MAIN';
      state.current = 'HOME_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadCreatePage(state) {
      state.status = 'OTHER';
      state.current = 'CREATE_PAGE';
      state.name = '링크';
      state.isEllipsis = false;
    },

    loadFeedPage(state) {
      state.status = 'MAIN';
      state.current = 'FEED_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadMyProfilePage(state) {
      state.status = 'OTHER';
      state.current = 'MY_PROFILE_PAGE';
      state.name = '';
      state.isEllipsis = true;
    },

    loadProfileEditPage(state) {
      state.status = 'OTHER';
      state.current = 'PROFILE_EDIT_PAGE';
      state.name = '';
      state.isEllipsis = false;
    },

    loadFollowerPage(state, action) {
      state.status = 'OTHER';
      state.current = 'FOLLOWER_PAGE';
      state.name = action.payload.userName;
      state.isEllipsis = false;
    },

    loadFollowingPage(state, action) {
      state.status = 'OTHER';
      state.current = 'FOLLOWING_PAGE';
      state.name = action.payload.userName;
      state.isEllipsis = false;
    },

    loadConfigHashtag(state) {
      state.status = 'OTHER';
      state.current = 'CONFIG_HASHTAG';
      state.name = '해시태그 관리';
      state.isEllipsis = false;
    },

    loadTrashPage(state) {
      state.status = 'OTHER';
      state.current = 'TRASH_PAGE';
      state.name = '삭제 보관함';
      state.isEllipsis = false;
    },

    // 페이지 추가시 reducer추가
  },
});
