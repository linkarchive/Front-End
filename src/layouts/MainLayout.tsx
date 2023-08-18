import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import GoBackHeader from '@/components/Common/Header/GoBackHeader';
import { RootState } from '@/store';
import MainHeader from '@/components/Common/Header/MainHeader';
import BottomNav from '@/components/BottomNav/BottomNav';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, current } = useSelector((state: RootState) => state.router);
  const MAIN = status === 'MAIN';
  const ARCHIVE = current === 'ARCHIVE_PAGE';
  const HOME = current === 'HOME_PAGE';
  const FEED = current === 'FEED_PAGE';

  return (
    <>
      <WaterMark />
      {MAIN ? <MainHeader /> : <GoBackHeader />}
      <Main>{children}</Main>
      {(HOME || ARCHIVE || FEED) && <BottomNav />}
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  position: relative;
  min-height: calc(100vh - 91px - 60px);
`;

const WaterMark = () => {
  let envText = '';
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    return null;
  }
  envText = `${process.env.NEXT_PUBLIC_APP_ENV}`;

  return <Wrapper>{envText}</Wrapper>;
};

const Wrapper = styled.h2`
  z-index: 100;
  display: inline-flex;
  position: fixed;
  inset: 0;
  margin: auto;
  width: 0;

  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.primary.main};
  transform: rotate(45deg);
  opacity: 0.2;

  pointer-events: none;
`;
