import React from 'react';
import styled from 'styled-components';
import CircleXMarkSvgIcon from '@/assets/svg/circleXMark.svg';

const CircleXMarkSvg = () => {
  return (
    <SvgIcon>
      <CircleXMarkSvgIcon />
    </SvgIcon>
  );
};

const SvgIcon = styled.span`
  svg {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export default CircleXMarkSvg;
