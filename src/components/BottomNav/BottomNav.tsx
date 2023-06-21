import ArchiveBtn from '@/components/BottomNav/ArchiveBtn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import HomeBtn from './HomeBtn';
import SettingsBtn from './SettingsBtn';
import { zIndex } from '@/constants/zIndex';

const BottomNavHight = '70px';

const BottomNav = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>('home');

  useEffect(() => {
    const path = router.pathname;
    const getActiveItem = () => {
      if (path === '/') return 'home';
      if (path.startsWith('/archive')) return 'archive';
      if (path.startsWith('/settings')) return 'settings';
      return 'home';
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
  width: var(--default-width);
  height: ${BottomNavHight};
  border-top: 1px solid var(--border-color-lighter-gray);

  background-color: var(--background-color-default);
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default BottomNav;
export { BottomNavHight };
