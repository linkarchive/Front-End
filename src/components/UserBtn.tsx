import React from 'react';
import Link from 'next/link';
import UserSvgIcon from 'public/assets/svg/user.svg';
import { SvgIcon, SvgWrapper } from './SvgStyle';

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
