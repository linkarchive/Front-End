import API from '@/api/API';
import { clientInstance } from '@/api/customAPI';
import Spinner from '@/components/Spinner';
import { useAppDispatch } from '@/store';
import { toastBarState } from '@/store/slices/toastBarSlice';
import { setUser } from '@/store/slices/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const KakaoAuth = () => {
  const router = useRouter();
  const { apiUrl } = useSelector(toastBarState);

  useEffect(() => {
    console.log(apiUrl);
  }, [apiUrl]);

  // API 호출 함수 정의
  const kakaoLogin = async ({ code }) => {
    const response = await clientInstance.post(`${apiUrl}/auth/kakao`, null, {
      params: {
        code,
      },
    });
    return response;
  };
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({ mutationFn: kakaoLogin });

  const handleKakaoLogin = useCallback(() => {
    if (router.query.code) {
      const code = router.query.code as string;
      loginMutation.mutate(
        { code },
        {
          onSuccess: async (response) => {
            const { accessToken, refreshToken, userId, nickname } = response.data;
            await API.setAllCookies({ accessToken, refreshToken, userId, nickname });
            await dispatch(setUser({ myId: userId, myNickname: nickname }));

            window.location.href = '/archive';
          },

          onError: () => {
            // FIXME: 토스트 메세지 '로그인에 실패했습니다. + 에러메세지' -> 로그인 페이지로 다시 이동
            router.push('/login');
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
