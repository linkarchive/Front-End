import React from 'react';
import Link from 'next/link';
import UserSvgIcon from 'public/assets/svg/user.svg';
import { SvgIcon, SvgWrapper } from './SvgStyle.styled';

type UserBtnProps = {
  activeItem: string;
};

const UserBtn = ({ activeItem }: UserBtnProps) => {
  return (
    <SvgWrapper>
      <Link href='/user/profile'>
        <SvgIcon isActive={activeItem === 'user'}>
          <UserSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default UserBtn;
