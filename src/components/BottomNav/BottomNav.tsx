import ArchiveBtn from '@/components/BottomNav/ArchiveBtn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import HomeBtn from './HomeBtn';
import SettingsBtn from './SettingsBtn';
import { zIndex } from '@/constants/zIndex';
import CreateBtn from './CreateBtn';

const BottomNav = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>('home');

  useEffect(() => {
    const path = router.pathname;
    const getActiveItem = () => {
      if (path === '/' || path === '/create' || path === '/login') return 'home';
      if (path.startsWith('/settings')) return 'settings';
      return 'archive';
    };
    setActiveItem(getActiveItem());
  }, [router.pathname]);

  return (
    <FooterWrapper>
      <Nav>
        <ArchiveBtn activeItem={activeItem} />
        <SettingsBtn activeItem={activeItem} />
        <HomeBtn activeItem={activeItem} />
      </Nav>
      <CreateBtn />
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: ${zIndex.BottomNav};

  box-sizing: border-box;
  width: 375px;
  height: 60px;
  border-top: 1px solid ${({ theme }) => theme.gray.lightBlack};

  background-color: ${({ theme }) => theme.common.white};
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default BottomNav;
