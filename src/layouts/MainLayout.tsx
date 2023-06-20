import React from 'react';
import BottomNav, { BottomNavHight } from '@/components/BottomNav/BottomNav';
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
  return (
    <>
      <WaterMark />
      {!main && <Header />}
      {main && (
        <>
          {home && <HomeHeader />}
          {Archive && <ArchiveHeader />}
          {settings && <SettingsHeader />}
        </>
      )}
      <Main>{children}</Main>
      <BottomNav />
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  padding-bottom: ${BottomNavHight};
`;

const WaterMark = () => {
  let envText = '';
  if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
    envText = '개발 환경입니다.';
  } else if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    envText = '프로덕션 환경입니다.';
  } else if (process.env.NEXT_PUBLIC_APP_ENV === 'test') {
    envText = 'SSG 테스트환경';
  } else {
    envText = '로컬 환경입니다.';
  }

  return <Wrapper>{envText}</Wrapper>;
};

const Wrapper = styled.h4`
  display: flex;
  justify-content: center;

  color: var(--font-color-primary);
`;
