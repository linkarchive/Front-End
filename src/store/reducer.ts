import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { exampleSlice } from './slices/exampleSlice';
import { routerSlice } from './slices/routerSlice';

const combinedReducer = combineReducers({
  auth: exampleSlice.reducer,
  router: routerSlice.reducer,
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
