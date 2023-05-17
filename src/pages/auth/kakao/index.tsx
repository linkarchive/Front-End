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

        // localStorage에 토큰을 저장하는 Promise 생성
        const storagePromise = new Promise((resolve, reject) => {
          localStorage.setItem('accessToken', token);
          if (localStorage.getItem('accessToken')) {
            resolve(true);
          } else {
            reject(new Error('토큰 저장 실패'));
          }
        });

        // 토큰 저장이 완료되면 이전 페이지로 이동
        storagePromise
          .then(() => {
            router.back();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    handleKakaoLogin();
  }, [router]);

  return (
    <>
      <span>{router.query.code}</span>
      <button type='button'>클릭</button>
    </>
  );
};

export default KakaoAuth;
