import { createSlice } from '@reduxjs/toolkit';

export const followerTabSlice = createSlice({
  name: 'followerTab',
  initialState: { activeItem: '' },
  reducers: {
    onClick(state, { payload }) {
      state.activeItem = payload;
    },
  },
});
