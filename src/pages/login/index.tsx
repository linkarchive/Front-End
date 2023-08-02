import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { routerSlice } from '@/store/slices/routerSlice';
import { useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import { setApiUrl, toastBarState } from '@/store/slices/toastBarSlice';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadLoginPage());
  }, [dispatch]);

  const [clientId, setClientId] = useState('6d4215acd0b9bb536446d9a6b50e0eb8');

  const { apiUrl } = useSelector(toastBarState); // 현재 apiUrl 상태를 조회합니다.
  const RedirectUri = `${apiUrl}/auth/kakao`;

  const handleApiBaseUrlChange = () => {
    const newApiUrl =
      apiUrl === 'https://api.link-archive.com'
        ? 'https://product.link-archive.com'
        : 'https://api.link-archive.com';
    dispatch(setApiUrl(newApiUrl)); // 새로운 apiUrl로 상태를 변경합니다.
  };

  const handleClientIdChange = () => {
    setClientId((prevClientId) =>
      prevClientId === '6d4215acd0b9bb536446d9a6b50e0eb8'
        ? '007ec5398a74c54203469840f4a3370e'
        : '6d4215acd0b9bb536446d9a6b50e0eb8'
    );
  };

  const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${RedirectUri}&response_type=code`;

  return (
    <Wrapper>
      <h2>로그인 해주세요.</h2>
      <div>
        <input type='checkbox' onChange={handleClientIdChange} />
        <span>클라이언트 ID 변경</span>
        <span>{clientId}</span>
        <div>
          <input type='checkbox' onChange={handleApiBaseUrlChange} />
          <span>API 주소 변경</span>
          <span>{apiUrl}</span>
        </div>
      </div>
      <Link href={KakaoAuthUrl}>
        <Content>
          <Image src='/kakao_login.png' alt='kakao_login' fill />
        </Content>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0 0 20%;
  margin: auto;
`;

const Content = styled.div`
  position: relative;
  width: 200px;
  height: 50px;

  img {
    :hover {
      filter: brightness(0.8);
    }
  }
`;

export default Login;
