import React from 'react';
import BottomNav, { BottomNavHight } from '@/components/BottomNav';
import styled from 'styled-components';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Main>{children}</Main>
      <BottomNav />
    </>
  );
};

export default MainLayout;

const Main = styled.main`
  padding-bottom: ${BottomNavHight};
`;
