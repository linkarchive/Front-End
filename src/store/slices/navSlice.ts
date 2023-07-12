import { createSlice } from '@reduxjs/toolkit';

interface RouterState {
  myLink: boolean;
  userLink: boolean;
}

const initialState: RouterState = {
  myLink: true,
  userLink: true,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    onClickMyLink(state) {
      state.myLink = true;
    },
    onClickMyMark(state) {
      state.myLink = false;
    },
    onClickUserLink(state) {
      state.userLink = true;
    },
    onClickUserMark(state) {
      state.userLink = false;
    },
  },
});
