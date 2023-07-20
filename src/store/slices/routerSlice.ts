import { createSlice } from '@reduxjs/toolkit';

interface RouterState {
  status: string;
  current?: string;
  name?: string;
}

const initialState: RouterState = {
  status: 'MAIN',
  current: '홈',
  name: '',
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    loadHomePage(state) {
      state.status = 'MAIN';
      state.current = 'HOME';
    },
    loadArchivePage(state) {
      state.status = 'MAIN';
      state.current = 'ARCHIVE';
    },
    loadProfilePage(state) {
      state.status = 'MAIN';
      state.current = 'SETTINGS';
    },
    loadUserPage(state) {
      state.status = 'MAIN';
      state.current = 'NONE';
    },
    loadCreatePage(state) {
      state.status = 'OTHER';
      state.name = '링크 추가';
    },
    loadLoginPage(state) {
      state.status = 'OTHER';
      state.name = 'Linkarchive';
    },
    loadProfileDetailPage(state) {
      state.status = 'OTHER';
      state.current = 'PROFILE';
      state.name = '프로필';
    },
    loadTrashPage(state) {
      state.status = 'OTHER';
      state.current = 'TRASH';
      state.name = '삭제 보관함';
    },
    // 페이지 추가시 reducer추가
  },
});
