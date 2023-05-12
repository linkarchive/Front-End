import Input from '@/components/Input';
import styled from 'styled-components';

const InputWithButton = () => {
  return (
    <Input>
      <Button type='button'>asdf</Button>
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
