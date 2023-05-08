import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from '../assets/svg/SvgStyle';
import UserSvgIcon from '@/assets/svg/user.svg';

const UserBtn = () => {
  return (
    <SvgWrapper>
      <Link href='/user'>
        <SvgIcon>
          <UserSvgIcon />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default UserBtn;
