import { createSlice } from '@reduxjs/toolkit';

interface ExampleState {
  val: number;
}

const initialState: ExampleState = {
  val: 0,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment(state) {
      state.val += 1;
    },
    decrement(state) {
      state.val -= 1;
    },
  },
  // 비동기 액션용
  extraReducers: () => {},
});
