import React from 'react';
import Footer from '../components/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
