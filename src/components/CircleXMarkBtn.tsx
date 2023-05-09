import React from 'react';
import styled from 'styled-components';
import CircleXMarkSvgIcon from 'public/assets/svg/circleXMark.svg';

const CircleXMarkSvg = () => {
  return (
    <SvgIcon>
      <CircleXMarkSvgIcon />
    </SvgIcon>
  );
};

const SvgIcon = styled.span`
  svg {
    width: var(--svg-width-md);
    height: var(--svg-height-md);
    cursor: pointer;
  }
`;

export default CircleXMarkSvg;
