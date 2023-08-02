import { createSlice } from '@reduxjs/toolkit';

interface ToastBar {
  text?: string;
  children?: React.ReactNode;
  show: boolean;
  apiUrl?: string; // 추가된 상태
}

const initialState: ToastBar = {
  text: '',
  children: '',
  show: false,
  apiUrl: 'https://api.link-archive.com', // 초기값
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
    setApiUrl(state, action) {
      // 추가된 액션
      state.apiUrl = action.payload;
    },
  },
});

export const toastBarState = (state) => state.toastBar;
export const { setToastBar, destroyToastBar, setApiUrl } = toastBarSlice.actions;
export const createToastBar = (props) => (dispatch) => {
  dispatch(setToastBar(props));
};
