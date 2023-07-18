import axios from 'axios';

let source;

export const createSource = () => {
  source = axios.CancelToken.source();
  return source;
};

export const getSource = () => source;

export const cancelSource = () => {
  if (source) {
    source.cancel('Component unmounted');
  }
};
