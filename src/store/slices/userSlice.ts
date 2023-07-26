import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  myId: string | null;
  myNickname: string | null;
}

const initialState: UserState = {
  myId: null,
  myNickname: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.myId = action.payload;
    },
    setNickname: (state, action: PayloadAction<string | null>) => {
      state.myNickname = action.payload;
    },
  },
});

export const userState = (state) => state.user;
export const { setUserId, setNickname } = userSlice.actions;

export const setUser =
  ({ myId, myNickname }: { myId: string | null; myNickname: string | null }) =>
  (dispatch) => {
    dispatch(setUserId(myId));
    dispatch(setNickname(myNickname));
  };
