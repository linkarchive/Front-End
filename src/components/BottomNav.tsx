import HomeBtn from './HomeBtn';
import ExploreBtn from '@/components/ExploreBtn';
import UserBtn from '@/components/UserBtn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const BottomNavHight = '70px';

const BottomNav = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>('home');

  useEffect(() => {
    const path = router.pathname;
    const getActiveItem = () => {
      if (path === '/') return 'home';
      if (path.startsWith('/explore')) return 'explore';
      if (path.startsWith('/user')) return 'user';
      return 'home';
    };
    setActiveItem(getActiveItem());
  }, [router.pathname]);

  return (
    <FooterWrapper>
      <Nav>
        <HomeBtn activeItem={activeItem} />
        <ExploreBtn activeItem={activeItem} />
        <UserBtn activeItem={activeItem} />
      </Nav>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 0;
  width: var(--default-width);
  height: ${BottomNavHight};
  align-items: center;
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
