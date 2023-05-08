import React from 'react';
import BottomNav from '../components/BottomNav';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <BottomNav />
    </>
  );
};

export default MainLayout;
