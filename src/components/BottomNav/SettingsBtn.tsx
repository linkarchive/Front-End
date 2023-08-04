import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';
import { FollowSvg } from '../svg/Svg';

type SettingsBtnProps = {
  activeItem: string;
};

const SettingsBtn = ({ activeItem }: SettingsBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/settings'>
        <SvgIcon isActive={activeItem === 'settings'}>
          <FollowSvg />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default SettingsBtn;
