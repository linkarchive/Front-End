import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../assets/svg/SvgStyle';
import SearchSvgIcon from '@/assets/svg/search.svg';

const ExploreBtn = () => {
  return (
    <SvgWrapper>
      <Link href='/explore'>
        <SvgIcon>
          <SearchSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default ExploreBtn;
