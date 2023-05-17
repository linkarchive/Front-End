import API from '@/api/API';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const KakaoAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (router.query.code) {
        const code = router.query.code as string;
        const response = await API.kakaoLogin({ code });
        const token = response.data.accessToken;
        localStorage.setItem('accessToken', token);
      }
    };

    handleKakaoLogin();
  }, [router.query]);

  return (
    <>
      <span>{router.query.code}</span>
      <button type='button'>클릭</button>
    </>
  );
};

export default KakaoAuth;
