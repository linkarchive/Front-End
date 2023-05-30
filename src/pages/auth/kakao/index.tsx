import API from '@/api/API';
import Spinner from '@/components/Spinner';
import { ACCESS_TOKEN, HOURS_IN_DAY, NICKNAME, REFRESH_TOKEN, USER_ID } from '@/constants';
import { setCookies } from '@/utils';
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
            const { accessToken, refreshToken, userId, nickname } = response.data;

            setCookies([
              { name: ACCESS_TOKEN, value: accessToken, days: 2 / HOURS_IN_DAY },
              { name: REFRESH_TOKEN, value: refreshToken, days: 30 },
              { name: USER_ID, value: userId, days: 30 },
              { name: NICKNAME, value: nickname, days: 30 },
            ]);

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
