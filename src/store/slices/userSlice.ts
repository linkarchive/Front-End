import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  myId: number | null;
  myNickname: number | null;
}

const initialState: UserState = {
  myId: null,
  myNickname: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number | null>) => {
      state.myId = action.payload;
    },
    setNickname: (state, action: PayloadAction<number | null>) => {
      state.myNickname = action.payload;
    },
  },
});

export const userState = (state) => state.user;
export const { setUserId, setNickname } = userSlice.actions;

export const setUser =
  ({ myId, myNickname }: { myId: number | null; myNickname: number | null }) =>
  (dispatch) => {
    dispatch(setUserId(myId));
    dispatch(setNickname(myNickname));
  };
