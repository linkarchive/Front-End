import React from 'react';
import { useRouter } from 'next/router';
import { SvgIcon } from '../assets/svg/SvgStyle';
import GoBackSvgIcon from '@/assets/svg/chevron-left.svg';

const GoBackBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <SvgIcon onClick={handleClick}>
      <GoBackSvgIcon />
    </SvgIcon>
  );
};

export default GoBackBtn;
