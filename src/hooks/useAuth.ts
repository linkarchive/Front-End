import { useState } from 'react';
import { getAccessToken } from '@/api/customAPI';

const useAuth = () => {
  const [isLoggedin, setIsLoggedin] = useState(!!getAccessToken());

  return { isLoggedin };
};

export default useAuth;
