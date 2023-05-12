import Input, { InputProps } from '@/components/Input';
import styled from 'styled-components';

interface InputWithButtonProps extends InputProps {
  text: string;
  onClick: (e) => void;
}

const InputWithButton = ({ text, onClick, ...inputProps }: InputWithButtonProps) => {
  return (
    <Input {...inputProps}>
      <Button type='button' onClick={onClick}>
        {text}
      </Button>
    </Input>
  );
};

export default InputWithButton;

const Button = styled.button`
  width: 108px;
  margin-left: 4px;

  background: var(--button-color-primary);
  border: none;
  border-radius: 4px;

  color: var(--font-color-white);
`;
