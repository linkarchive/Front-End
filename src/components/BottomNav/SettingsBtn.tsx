import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';
import { FollowSvg } from '../svg/Svg';

type SettingsBtnProps = {
  activeItem: string;
};

const FeedBtn = ({ activeItem }: SettingsBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/feed'>
        <SvgIcon isActive={activeItem === 'feed'}>
          <FollowSvg />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default FeedBtn;
