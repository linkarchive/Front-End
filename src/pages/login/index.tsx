import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { routerSlice } from '@/store/slices/routerSlice';
import { useAppDispatch } from '@/store';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadLoginPage());
  }, [dispatch]);

  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const RedirectUri = `${domain}/auth/kakao`;

  const [clientId, setClientId] = useState('6d4215acd0b9bb536446d9a6b50e0eb8');

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
        <div>api주소</div>
        <span>{process.env.NEXT_PUBLIC_API_BASE_URL}</span>
      </div>
      <Link href={KakaoAuthUrl}>
        <Content>
          <Image src='/kakao_login.png' alt='kakao_login' fill />
        </Content>
      </Link>
    </Wrapper>
  );
};

// 나머지 코드...

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
