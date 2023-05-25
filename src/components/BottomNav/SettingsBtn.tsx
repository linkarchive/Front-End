import React from 'react';
import Link from 'next/link';
import UserSvgIcon from 'public/assets/svg/user.svg';
import { SvgIcon, SvgWrapper } from '../SvgStyle.styled';

type SettingsBtnProps = {
  activeItem: string;
};

const SettingsBtn = ({ activeItem }: SettingsBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/settings'>
        <SvgIcon isActive={activeItem === 'settings'}>
          <UserSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default SettingsBtn;
