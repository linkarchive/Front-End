import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
}

const initialState: UserState = {
  id: 1,
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getSelectedUserData(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
  // 비동기 액션용
  extraReducers: () => {},
});
