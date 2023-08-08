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
  border: 1px solid ${({ theme }) => theme.gray.lightGray};
  border-color: ${({ isActive, theme }) => (isActive ? theme.primary.main : theme.gray.lightGray)};
  padding: 16px;
  gap: 4px;
  width: ${(props) => props.width};
  height: 38px;

  background-color: ${({ theme }) => theme.common.white};

  color: ${({ isActive, theme }) => (isActive ? theme.primary.main : theme.gray.lightGray)};

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18.2px;
`;
