import { createSlice } from '@reduxjs/toolkit';

interface ToastBar {
  text?: string;
  children?: React.ReactNode;
  show: boolean;
}

type ToastBarProps = Pick<ToastBar, 'text' | 'children'>;

const initialState: ToastBar = {
  text: '',
  children: '',
  show: false,
};

export const toastBarSlice = createSlice({
  name: 'toastBar',
  initialState,
  reducers: {
    setToastBar(state, action) {
      state.text = action.payload.text || initialState.text;
      state.children = action.payload.children || initialState.children;
      state.show = true;
    },
    destroyToastBar(state) {
      state.show = false;
    },
  },
});

export const toastBarState = (state) => state.toastBar;
export const { setToastBar, destroyToastBar } = toastBarSlice.actions;
export const createToastBar = (props) => (dispatch) => {
  dispatch(setToastBar(props));
};
