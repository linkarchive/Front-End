import { InputClearIcon } from '@/components/svg/Svg';
import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import ErrorMessage from '@/components/Common/TextInput/ErrorMessage';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  errorMessage?: string;
  onClear: () => void;
}

const ProfileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  margin-bottom: 10px;
`;

const StyledH3 = styled.h3`
  padding: 15px 0;

  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  color: ${({ theme }) => theme.gray.mediumGray};
`;

const StyledSpan = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  color: ${({ theme }) => theme.primary.main};
`;

const InputBlock = styled.div<{ isChanged?: boolean }>`
  display: flex;

  width: 100%;

  border-bottom: 1px solid black;
  border-color: ${({ isChanged, theme }) =>
    isChanged ? theme.primary.main : theme.gray.lighterGray};
`;

const Input = styled.input<{ isChanged: boolean }>`
  padding-bottom: 10px;
  height: 30px;
  width: 100%;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;

  outline: none;

  color: ${({ theme }) => theme.common.black};

  ::placeholder {
    color: ${({ theme }) => theme.gray.lighterGray};
  }
`;

const ClearButton = styled.button`
  appearance: none;
`;

const TextInput = ({
  id,
  label,
  placeholder,
  required,
  value,
  errorMessage,
  onChange,
  onClear,
}: TextInputProps) => {
  const [text, setText] = useState(value);

  const isChanged = text !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onChange(e);
  };

  const handleClear = () => {
    setText('');
    onClear();
  };

  return (
    <ProfileInputWrapper>
      <label htmlFor={id}>
        <StyledH3>
          {label}
          {required && <StyledSpan>*</StyledSpan>}
        </StyledH3>
      </label>
      <InputBlock>
        <Input
          type='text'
          id='nickname'
          value={text}
          isChanged={isChanged}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {isChanged && (
          <div>
            <ClearButton role='button' onClick={handleClear}>
              <InputClearIcon />
            </ClearButton>
          </div>
        )}
      </InputBlock>
      <ErrorMessage message={errorMessage} />
    </ProfileInputWrapper>
  );
};

export default TextInput;
