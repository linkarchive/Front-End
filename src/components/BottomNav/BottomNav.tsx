import ArchiveBtn from '@/components/BottomNav/ArchiveBtn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import HomeBtn from './HomeBtn';
import SettingsBtn from './SettingsBtn';
import { zIndex } from '@/constants/zIndex';

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
        <HomeBtn activeItem={activeItem} />
        <ArchiveBtn activeItem={activeItem} />
        <SettingsBtn activeItem={activeItem} />
      </Nav>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: ${zIndex.BottomNav};

  box-sizing: border-box;
  width: 375px;
  height: 70px;
  border-top: 1px solid ${({ theme }) => theme.gray.lighterGray};

  background-color: ${({ theme }) => theme.common.white};
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default BottomNav;
