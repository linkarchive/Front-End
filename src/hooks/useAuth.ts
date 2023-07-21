import { useState } from 'react';
import { getAccessToken } from '@/api/customAPI';

const useAuth = () => {
  const [isLoggedin] = useState(!!getAccessToken());

  return { isLoggedin };
};

export default useAuth;
