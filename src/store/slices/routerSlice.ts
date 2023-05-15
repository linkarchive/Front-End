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
    loadExplorePage(state) {
      state.status = 'MAIN';
      state.current = 'EXPLORE';
    },
    loadProfilePage(state) {
      state.status = 'MAIN';
      state.current = 'PROFILE';
    },
    loadCreatePage(state) {
      state.status = 'OTHER';
      state.name = '링크 추가';
    },
    // 페이지 추가시 reducer추가
  },
});
