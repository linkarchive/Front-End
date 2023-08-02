import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';
import { HomeSvg } from '../svg/Svg';

type HomeBtnProps = {
  activeItem: string;
};

const HomeBtn = ({ activeItem }: HomeBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/'>
        <SvgIcon isActive={activeItem === 'home'}>
          <HomeSvg />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default HomeBtn;
