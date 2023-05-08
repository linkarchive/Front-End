import { AxiosResponse } from 'axios';
import { defaultInstance } from './customAPI';

const API = {
  sample: async (params: string): Promise<AxiosResponse> => {
    const response = await defaultInstance.get(`sample`, {
      params,
    });
    return response;
  },
};

export default API;
