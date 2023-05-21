import React from 'react';
import styled, { keyframes } from 'styled-components';
import SpinnerIcon from 'public/assets/svg/spinner.svg';

const Spinner = () => {
  return (
    <Wrapper>
      <SpinnerIcon />
    </Wrapper>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

const Wrapper = styled.span`
  width: 20px;
  height: 20px;

  animation: ${spin} 2s linear infinite;
`;

export default Spinner;
