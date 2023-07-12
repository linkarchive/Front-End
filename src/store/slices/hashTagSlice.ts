import { createSlice } from '@reduxjs/toolkit';

interface HashTag {
  tagId: number;
  selectedTagName: string;
}

const initialState: HashTag = {
  tagId: 0,
  selectedTagName: 'All',
};

export const HashTagSlice = createSlice({
  name: 'hashTag',
  initialState,
  reducers: {
    setInitialState(state) {
      state.selectedTagName = 'All';
    },
    onClickHashTag(state, action) {
      state.selectedTagName = action.payload.tagName;
    },
  },
});

export const { onClickHashTag } = HashTagSlice.actions;
