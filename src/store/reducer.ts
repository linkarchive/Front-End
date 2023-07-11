import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { routerSlice } from './slices/routerSlice';
import { toastBarSlice } from './slices/toastBarSlice';
import { homeSlice } from './slices/homeSlice';
import { HashTagSlice } from './slices/hashTagSlice';
import { userSlice } from './slices/userSlice';

const combinedReducer = combineReducers({
  router: routerSlice.reducer,
  home: homeSlice.reducer,
  toastBar: toastBarSlice.reducer,
  hashTag: HashTagSlice.reducer,
  user: userSlice.reducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
