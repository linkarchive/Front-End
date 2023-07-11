import { createSlice } from '@reduxjs/toolkit';

interface HashTag {
  tagId: number;
  tagName: string;
}

const initialState: HashTag = {
  tagId: 0,
  tagName: 'All',
};

export const HashTagSlice = createSlice({
  name: 'hashTag',
  initialState,
  reducers: {
    setHashTag(state, action) {
      state.tagName = action.payload.tagName;
    },
  },
});

export const { setHashTag } = HashTagSlice.actions;
export const onClickHashTag = (props) => (dispatch) => {
  dispatch(setHashTag(props));
};
