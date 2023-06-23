import { createSlice } from '@reduxjs/toolkit';

interface RouterState {
  name: string;
}

const initialState: RouterState = {
  name: '내 링크',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    onClickLink(state) {
      state.name = '내 링크';
    },
    onClickMark(state) {
      state.name = '내 마크';
    },
  },
});
