import React from 'react';
import Link from 'next/link';
import HomeSvgIcon from 'public/assets/svg/home.svg';
import { SvgIcon, SvgWrapper } from './SvgStyle';

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
