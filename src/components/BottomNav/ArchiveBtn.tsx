import React from 'react';
import Link from 'next/link';
import SearchSvgIcon from 'public/assets/svg/search.svg';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';

type ArchiveBtnProps = {
  activeItem: string;
};

const ArchiveBtn = ({ activeItem }: ArchiveBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/archive'>
        <SvgIcon isActive={activeItem === 'archive'}>
          <SearchSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default ArchiveBtn;
