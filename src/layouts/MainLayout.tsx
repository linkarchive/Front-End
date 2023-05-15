import React from 'react';
import BottomNav, { BottomNavHight } from '@/components/BottomNav';
import styled from 'styled-components';
import HomeHeader from '@/components/Home/HomeHeader';
import Header from '@/components/Header';
import { useSelector } from 'react-redux';
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
  padding-bottom: ${BottomNavHight};
`;
