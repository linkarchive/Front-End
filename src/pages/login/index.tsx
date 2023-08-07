import React, { useEffect } from 'react';
import { KakaoAuthUrl } from '../../constants';
import Link from 'next/link';
import styled from 'styled-components';
import { routerSlice } from '@/store/slices/routerSlice';
import { useAppDispatch } from '@/store';
import KakaoButton from './KakaoButton';
import Logo from './Logo';

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadLoginPage());
  }, [dispatch]);

  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <AuthWrapper>
        <div>
          <KakaoAuthBox>
            <Link href={KakaoAuthUrl}>
              <KakaoButton />
            </Link>
          </KakaoAuthBox>
        </div>
      </AuthWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 375px;

  /* FIXME: header 높이 변수화 해서 동적으로 처리해야함 */
  height: calc(100% - 48px);
  margin: auto;

  background-color: #f8f6ef;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
`;

const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const KakaoAuthBox = styled.div`
  padding: 8px;

  img {
    :hover {
      filter: brightness(0.8);
    }
  }
`;

export default Login;
