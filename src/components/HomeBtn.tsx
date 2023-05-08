import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../assets/svg/SvgStyle';
import HomeSvgIcon from '@/assets/svg/home.svg';

const HomeSvg = () => {
  return (
    <SvgWrapper>
      <Link href='/'>
        <SvgIcon>
          <HomeSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default HomeSvg;
