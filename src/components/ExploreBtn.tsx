import React from 'react';
import Link from 'next/link';
import SearchSvgIcon from 'public/assets/svg/search.svg';
import { SvgIcon, SvgWrapper } from './SvgStyle';

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
