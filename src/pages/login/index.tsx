import React, { ReactElement, useEffect } from 'react';
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
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <AuthWrapper>
          <AuthGroup>
            <KakaoAuthBox>
              <Link href={KakaoAuthUrl}>
                <KakaoButton />
              </Link>
            </KakaoAuthBox>
          </AuthGroup>

          <Link href='/archive'>
            <WithOutLoginButton>로그인 없이 이용하기</WithOutLoginButton>
          </Link>
        </AuthWrapper>
      </Wrapper>
    </Container>
  );
};

Login.getFullLayout = function getFullLayout(page: ReactElement) {
  return page;
};

const Container = styled.div`
  position: absolute;
  width: 375px;
  height: 100%;
  margin: auto;

  background-color: #f8f6ef;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  height: 90%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthGroup = styled.div`
  position: relative;
`;

const WithOutLoginButton = styled.div`
  padding-top: 10px;

  color: ${({ theme }) => theme.gray.lightGray};
  border-bottom: 1px solid ${({ theme }) => theme.gray.lightGray};
  cursor: pointer;

  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
