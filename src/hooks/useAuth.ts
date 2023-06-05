import { useState } from 'react';
import { ACCESS_TOKEN } from '@/constants';
import { getCookie } from '@/utils';

const useAuth = () => {
  const [isLoggedin, setIsLoggedin] = useState(!!getCookie(ACCESS_TOKEN));

  return { isLoggedin };
};

export default useAuth;
