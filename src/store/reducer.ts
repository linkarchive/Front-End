import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { routerSlice } from './slices/routerSlice';
import { userSlice } from './slices/userSlice';
import { toastBarSlice } from './slices/toastBarSlice';

const combinedReducer = combineReducers({
  router: routerSlice.reducer,
  user: userSlice.reducer,
  toastBar: toastBarSlice.reducer,
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
