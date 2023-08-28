import { InputClearIcon } from '@/components/svg/Svg';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';
import ErrorMessage from '@/components/Create/TextInput/ErrorMessage';
import Label from '@/components/Create/Label';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  errorMessage?: string;
  onClear: () => void;
}

const ProfileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

  useEffect(() => {
    // 상위 value가 변경될 때마다 state 업데이트
    setText(value);
  }, [value]);

  const isChanged = text !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
    onChange(e);
  };

  const handleClear = () => {
    setText('');
    onClear();
  };

  return (
    <ProfileInputWrapper>
      <Label htmlFor={id}>
        {label}
        {required && <StyledSpan>*</StyledSpan>}
      </Label>
      <InputBlock>
        <Input
          type='text'
          id={id}
          value={text}
          isChanged={isChanged}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 엔터시 clearButton 클릭 이벤트를 막음
            }
          }}
        />
        {isChanged && (
          <div>
            <ClearButton
              role='button'
              onClick={() => {
                handleClear();
              }}
            >
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
