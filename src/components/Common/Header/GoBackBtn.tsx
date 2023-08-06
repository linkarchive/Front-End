import React from 'react';
import { useRouter } from 'next/router';
import GoBackSvgIcon from 'public/assets/svg/chevron-left.svg';
import { SvgIcon } from '../../SvgStyle.styled';

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
