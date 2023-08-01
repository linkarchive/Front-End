import React from 'react';
import BottomNav from '@/components/BottomNav/BottomNav';
import styled from 'styled-components';
import HomeHeader from '@/components/Home/HomeHeader';
import { useSelector } from 'react-redux';
import Header from '@/components/Header/Header';
import { RootState } from '@/store';
import ArchiveHeader from '@/components/Archive/ArchiveHeader';
import SettingsHeader from '@/components/Settings/SettingsHeader';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, current } = useSelector((state: RootState) => state.router);
  const main = status === 'MAIN';
  const home = current === 'HOME';
  const Archive = current === 'ARCHIVE';
  const settings = current === 'SETTINGS';
  const none = current === 'NONE';
  return (
    <>
      <WaterMark />
      {!main && <Header />}
      {main && (
        <>
          {home && <HomeHeader />}
          {Archive && <ArchiveHeader />}
          {settings && <SettingsHeader />}
          {none}
        </>
      )}
      <Main>{children}</Main>
      <BottomNav />
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  padding-bottom: 70px;
`;

const WaterMark = () => {
  let envText = '';
  // if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
  //   return null;
  // }
  envText = `${process.env.NEXT_PUBLIC_APP_ENV}`;

  return <Wrapper>{envText}</Wrapper>;
};

const Wrapper = styled.h2`
  z-index: -1;
  display: flex;
  position: fixed;
  inset: 0;
  margin: auto;

  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.primary.main};
  transform: rotate(45deg);
  opacity: 0.2;
`;
