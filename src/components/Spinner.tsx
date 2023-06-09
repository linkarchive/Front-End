import React from 'react';
import styled, { keyframes } from 'styled-components';
import SpinnerIcon from 'public/assets/svg/spinner.svg';

interface SpinnerProps {
  width?: string;
  height?: string;
  color?: string;
}

const Spinner = ({ width, height, color }: SpinnerProps) => {
  return <AnimatedSpinner width={width} height={height} color={color} />;
};

Spinner.defaultProps = {
  width: '20px',
  height: '20px',
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AnimatedSpinner = styled(SpinnerIcon)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => props.color};
  animation: ${spin} 2s linear infinite;
`;

export default Spinner;
