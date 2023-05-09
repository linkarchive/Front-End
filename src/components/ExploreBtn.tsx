import React from 'react';
import Link from 'next/link';
import SearchSvgIcon from 'public/assets/svg/search.svg';
import { SvgIcon, SvgWrapper } from './SvgStyle';

type ExploreBtnProps = {
  activeItem: string;
};

const ExploreBtn = ({ activeItem }: ExploreBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/explore'>
        <SvgIcon isActive={activeItem === 'explore'}>
          <SearchSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default ExploreBtn;
