import React from 'react';
import Link from 'next/link';
import { SvgIcon, SvgWrapper } from './SvgIcon';

const UserSvg = () => {
  return (
    <SvgWrapper>
      <Link href='/user'>
        <SvgIcon viewBox='0 0 512 512'>
          <path d='M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z' />
        </SvgIcon>
      </Link>
    </SvgWrapper>
  );
};

export default UserSvg;
