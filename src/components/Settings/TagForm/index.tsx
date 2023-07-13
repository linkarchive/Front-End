import { useState } from 'react';
import styled from 'styled-components';
import { InputWithButton } from '@/components/Input';
import { validateHashTag } from '@/utils/validation';

const InputBlock = styled.div`
  padding: 0 5px;
  margin: 0 auto 54px;
  width: 327px;
`;

// TODO post api 호출
export const TagForm = () => {
  const [tag, setTag] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const createHashTag = {
    isLoading: false,
  };

  const handleSubmit = (e) => {
    if (createHashTag.isLoading) return;

    const errMsg = validateHashTag(tag);
    const isFormValid = !errMsg;
    if (!isFormValid) {
      setErrorMessage(errMsg);
      return;
    }

    console.log('api call'); // createHashTag.mutate({ tag });
  };

  return (
    <InputBlock>
      <InputWithButton
        onClick={handleSubmit}
        label='태그 추가'
        text='추가'
        placeholder='태그를 입력하세요.'
        value={tag}
        errMessage={errorMessage}
        onChange={(e) => {
          setTag(e.target.value);
        }}
      />
    </InputBlock>
  );
};
