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
  display: flex;
  margin-left: 2px;
`;

export default CircleXMarkSvg;
