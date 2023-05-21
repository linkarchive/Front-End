/* eslint-disable no-console */
export const thunk = (store) => (next) => (action) => {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'production') {
    if (typeof action === 'function') {
      console.group(`Dispatching a function action: ${action.name || action.toString()}`);
      console.log('Action:', action);
      console.log('State before:', store.getState());
      action(store.dispatch, store.getState);
      console.log('State after:', store.getState());
      console.groupEnd();
    } else {
      console.group(`Dispatching a regular action: ${action.type}`);
      console.log('Action:', action);
      console.log('State before:', store.getState());
      next(action);
      console.log('State after:', store.getState());
      console.groupEnd();
    }
  } else if (typeof action === 'function') {
    action(store.dispatch, store.getState());
  } else {
    next(action);
  }
};
