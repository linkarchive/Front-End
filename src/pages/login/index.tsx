import React from 'react';
import { KakaoAuthUrl } from '../../constants';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const Login = () => {
  return (
    <Wrapper>
      <h2>로그인 해주세요.test</h2>
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
