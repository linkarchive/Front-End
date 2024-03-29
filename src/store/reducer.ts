import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { routerSlice } from './slices/routerSlice';
import { toastBarSlice } from './slices/toastBarSlice';
import { hashTagSlice } from './slices/hashTagSlice';
import { userSlice } from './slices/userSlice';
import { navSlice } from './slices/navSlice';
import { followerTabSlice } from './slices/tabSlice';
import { countSlice } from './slices/countSlice';

const combinedReducer = combineReducers({
  router: routerSlice.reducer,
  nav: navSlice.reducer,
  followerTab: followerTabSlice.reducer,
  toastBar: toastBarSlice.reducer,
  hashTag: hashTagSlice.reducer,
  user: userSlice.reducer,
  count: countSlice.reducer,
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
