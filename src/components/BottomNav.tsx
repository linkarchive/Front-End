import HomeSvg from '@/components/HomeBtn';
import ExploreBtn from '@/components/ExploreBtn';
import UserBtn from '@/components/UserBtn';
import React from 'react';
import styled from 'styled-components';

const BottomNav = () => {
  return (
    <FooterWrapper>
      <Nav>
        <HomeSvg />
        <ExploreBtn />
        <UserBtn />
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
  height: 70px;
  align-items: center;
  border-top: 1px solid var(--border-color-gray);
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default BottomNav;
