import API from '@/api/API';
import Spinner from '@/components/Spinner';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const KakaoAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({ mutationFn: API.kakaoLogin });

  const handleKakaoLogin = useCallback(() => {
    if (router.query.code) {
      const code = router.query.code as string;
      loginMutation.mutate(
        { code },
        {
          onSuccess: (response) => {
            const { accessToken } = response.data;

            const expires = new Date();
            expires.setHours(expires.getHours() + 1); // 1시간 후에 만료
            document.cookie = `accessToken=${accessToken}; expires=${expires.toUTCString()}; path=/; secure`;

            router.push('/');
          },
          onError: (error) => {
            router.push('/');
          },
        }
      );
    }
  }, [router]);

  useEffect(() => {
    handleKakaoLogin();
  }, [handleKakaoLogin]);

  return (
    <Wrapper>
      <h2>로그인 중...</h2>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  inset: 0 0 20%;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default KakaoAuth;
