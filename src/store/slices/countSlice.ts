import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountProps {
  linkCount?: number | null;
  markCount?: number | null;
}

const initialState: CountProps = {
  linkCount: null,
  markCount: null,
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setLinkCount: (state, action: PayloadAction<number>) => {
      state.linkCount = action.payload;
    },
  },
});

export const { setLinkCount } = countSlice.actions;
