import { createSlice } from '@reduxjs/toolkit';

interface HashTag {
  selectedTagId: number;
  selectedTagName: string;
}

const initialState: HashTag = {
  selectedTagId: 0,
  selectedTagName: 'All',
};

export const hashTagSlice = createSlice({
  name: 'hashTag',
  initialState,
  reducers: {
    setInitialState(state) {
      state.selectedTagId = 0;
      state.selectedTagName = 'All';
    },
    onClickHashTag(state, action) {
      state.selectedTagId = action.payload.tagId;
      state.selectedTagName = action.payload.tagName;
    },
  },
});

export const { onClickHashTag } = hashTagSlice.actions;
