import { useState } from 'react';
import styled from 'styled-components';
import InputWithButton from '@/components/Input/InputWithButton';

const Input = ({ children, className }: { className?: string; children?: JSX.Element }) => {
  const [value, setValue] = useState('');
  const id = 'temp';

  return (
    <Wrapper className={className}>
      <label htmlFor={id}>제목</label>
      <div className='input'>
        <input
          type='text'
          name=''
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {children}
      </div>
      <span className='error'>에러메세지</span>
    </Wrapper>
  );
};

Input.deafultProps = {
  className: '',
};

export default Input;
export { InputWithButton };

const Wrapper = styled.div`
  label {
    display: block;
    margin-bottom: 7px;

    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: var(--font-color-darkGray);
  }

  .input {
    display: flex;
    flex-direction: row;
    height: 35px;

    input {
      width: 100%;
      padding-left: 16px;
      border-radius: 4px;
      border: 1px solid;
    }
  }

  .error {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--font-color-warn);
  }
`;
