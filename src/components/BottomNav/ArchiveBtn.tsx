import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';
import { ArchiveSvg } from '../svg/Svg';

type ArchiveBtnProps = {
  activeItem: string;
};

const ArchiveBtn = ({ activeItem }: ArchiveBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/archive'>
        <SvgIcon isActive={activeItem === 'archive'}>
          <ArchiveSvg />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default ArchiveBtn;
