import React, { useEffect } from 'react';
import { KakaoAuthUrl } from '../../constants';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { routerSlice } from '@/store/slices/routerSlice';
import { useAppDispatch } from '@/store';
import { parseCookies } from '@/utils';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { accessToken } = parseCookies(req.headers.cookie);

  return {
    props: {
      accessToken: accessToken || null,
    },
  };
};

const Login = ({ accessToken }: { accessToken: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(accessToken);
  }, []);

  useEffect(() => {
    dispatch(routerSlice.actions.loadLoginPage());
  }, [dispatch]);

  return (
    <Wrapper>
      <h2>로그인 해주세요.</h2>
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
