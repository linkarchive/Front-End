import Input, { InputProps } from '@/components/Input';
import styled from 'styled-components';

interface InputWithButtonProps extends InputProps {
  text?: string;
  ButtonChildren?: JSX.Element;
  onClick: (e) => void;
}

const InputWithButton = ({
  text,
  ButtonChildren,
  onClick,
  ...inputProps
}: InputWithButtonProps) => {
  return (
    <Input {...inputProps}>
      <Button type='button' onClick={onClick}>
        {ButtonChildren || text}
      </Button>
    </Input>
  );
};

export default InputWithButton;

const Button = styled.button`
  width: 108px;
  margin-left: 4px;

  background: ${({ theme }) => theme.primary.main};
  border: none;
  border-radius: 4px;

  color: ${({ theme }) => theme.common.white};
`;
