import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  myId: number | null;
  myNickname: number | null;
  myProfileImage: string | null;
}

const initialState: UserState = {
  myId: null,
  myNickname: null,
  myProfileImage: null,
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
    setProfileImage: (state, action: PayloadAction<string | null>) => {
      state.myProfileImage = action.payload;
    },
  },
});

export const userState = (state) => state.user;
export const { setUserId, setNickname, setProfileImage } = userSlice.actions;

export const setUser =
  ({ myId, myNickname, myProfileImage }: UserState) =>
  (dispatch) => {
    dispatch(setUserId(myId));
    dispatch(setNickname(myNickname));
    dispatch(setProfileImage(myProfileImage));
  };
