import HomeSvg from '@/assets/svg/HomeSvg';
import SearchSvg from '@/assets/svg/SearchSvg';
import SettingSvg from '@/assets/svg/SettingSvg';
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <nav>
        <HomeSvg />
        <SearchSvg />
        <SettingSvg />
      </nav>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  display: flex;
  position: fixed;
  background-color: red;
`;

export default Footer;
