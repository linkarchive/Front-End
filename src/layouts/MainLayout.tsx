import React from 'react';
import BottomNav, { BottomNavHight } from '@/components/BottomNav/BottomNav';
import styled from 'styled-components';
import HomeHeader from '@/components/Home/HomeHeader';
import { useSelector } from 'react-redux';
import Header from '@/components/Header/Header';
import { RootState } from '@/store';
import ExploreHeader from '@/components/Explore/ExploreHeader';
import ProfileHeader from '@/components/Profile/ProfileHeader';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, current } = useSelector((state: RootState) => state.router);
  const main = status === 'MAIN';
  const home = current === 'HOME';
  const explore = current === 'EXPLORE';
  const profile = current === 'PROFILE';
  return (
    <>
      <WaterMark />
      {!main && <Header />}
      {main && (
        <>
          {home && <HomeHeader />}
          {explore && <ExploreHeader />}
          {profile && <ProfileHeader />}
        </>
      )}
      <Main>{children}</Main>
      <BottomNav />
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  padding: 0 29px ${BottomNavHight} 26px;
`;

const WaterMark = () => {
  let envText = '';
  if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
    envText = '개발 환경입니다.';
  } else if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    envText = '프로덕션 환경입니다.';
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
