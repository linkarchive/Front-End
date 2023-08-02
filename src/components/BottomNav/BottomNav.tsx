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
    <>
      <FooterWrapper>
        <Nav>
          <ArchiveBtn activeItem={activeItem} />
          <SettingsBtn activeItem={activeItem} />
          <HomeBtn activeItem={activeItem} />
        </Nav>
        <CreateBtn />
      </FooterWrapper>
      <Test>
        <svg
          width='376'
          height='92'
          viewBox='0 0 376 92'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M299.057 15.1218L299.057 15.1222C301.002 18.8309 302.207 21.803 303.273 24.433C303.763 25.6398 304.223 26.7745 304.712 27.8754C306.265 31.3721 308.07 34.4156 311.927 38.0441C319.64 45.3003 328.963 47.4999 335.89 47.4999C339.388 47.4999 345.273 46.3846 351.036 43.4363C356.807 40.4844 362.496 35.6738 365.523 28.2589C369.324 18.9408 372.676 13.6534 375 11.0337V91.4999H1V1.18994H272.56C275.541 1.18994 280.791 2.01331 285.995 4.1827C291.2 6.35253 296.292 9.8401 299.057 15.1218Z'
            fill='white'
            stroke='#F5F5F5'
          />
        </svg>
      </Test>
    </>
  );
};

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: ${zIndex.BottomNav};

  box-sizing: border-box;
  width: 375px;
  height: 111px;

  background-color: transparent;
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: space-around;
  padding-right: 20px;
`;

const Test = styled.div`
  position: fixed;
  bottom: -5px;
  transform: translateX(-1px);
`;

export default BottomNav;
