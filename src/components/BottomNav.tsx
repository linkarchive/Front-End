import HomeSvg from '@/assets/svg/HomeSvg';
import ExploreSvg from '@/assets/svg/ExploreSvg';
import UserSvg from '@/assets/svg/UserSvg';
import React from 'react';
import styled from 'styled-components';

const BottomNav = () => {
  return (
    <FooterWrapper>
      <Nav>
        <HomeSvg />
        <ExploreSvg />
        <UserSvg />
      </Nav>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 400px;
  height: 70px;
  align-items: center;
  border-top: 1px solid black;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

export default BottomNav;
