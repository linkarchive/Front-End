import { useEffect } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  isActive: boolean;
  width: string;
}

interface ButtonProps {
  svg: JSX.Element;
  text: string;
  isActive: boolean;
  onClick: () => void;
  width: string;
}

const Button = ({ svg, text, isActive, onClick, width }: ButtonProps) => {
  return (
    <Wrapper isActive={isActive} onClick={onClick} width={width}>
      {svg}
      <span>{text}</span>
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.span<WrapperProps>`
  position: relative;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  padding: 10px 14px;
  border: 1px solid var(--hashtag-color-inactive-border);
  border-color: ${(props) =>
    props.isActive ? 'var(--hashtag-color-active-border)' : 'var(--hashtag-color-inactive-border)'};
  margin-right: 3px;
  width: ${(props) => props.width};
  height: 38px;

  background-color: var(--hashtag-color-background);

  color: ${(props) =>
    props.isActive ? 'var(--hashtag-color-active-border)' : 'var(--hashtag-color-inactive-border)'};

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;
