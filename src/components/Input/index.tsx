import styled from 'styled-components';
import InputWithButton from './InputWithButton';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: JSX.Element;
  value?: string;
  label: string;
  name?: string;
  errMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = ({
  children,
  value,
  label,
  name,
  errMessage,
  onChange,
  className,
  ...inputProps
}: InputProps) => {
  return (
    <Wrapper className={className}>
      <label htmlFor={name}>{label}</label>
      <div className='input'>
        <input
          {...inputProps}
          type='text'
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
        />
        {children}
      </div>
      {errMessage && <span className='error'>{errMessage}</span>}
    </Wrapper>
  );
};

Input.deafultProps = {
  className: '',
};

export default Input;
export { InputWithButton };
export type { InputProps };

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
