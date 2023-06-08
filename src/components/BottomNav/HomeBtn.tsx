import React from 'react';
import Link from 'next/link';
import HomeSvgIcon from 'public/assets/svg/home.svg';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';

type HomeBtnProps = {
  activeItem: string;
};

const HomeBtn = ({ activeItem }: HomeBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/'>
        <SvgIcon isActive={activeItem === 'home'}>
          <HomeSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default HomeBtn;
