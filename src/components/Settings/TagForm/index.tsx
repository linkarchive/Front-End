import { useState } from 'react';
import styled from 'styled-components';
import { InputWithButton } from '@/components/Input';
import { validateHashTag } from '@/utils/Create/validation';
import { useMutation } from '@tanstack/react-query';
import API from '@/api/API';

const InputBlock = styled.div`
  padding: 0 5px;
  margin: 0 auto 54px;
  width: 327px;
`;

export const TagForm = ({ onSuccess: onSubmit }: { onSuccess: () => void }) => {
  const [tag, setTag] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const createHashTag = useMutation({
    mutationFn: API.createTag,
    onSuccess: () => {
      onSubmit();
      setTag('');
      setErrorMessage('');
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = error as any; // FIXME
      if (d.response) {
        const { message } = d.response.data;
        setErrorMessage(message);
      }
    },
  });

  const handleSubmit = () => {
    if (createHashTag.isLoading) return;

    const errMsg = validateHashTag(tag);
    const isFormValid = !errMsg;
    if (!isFormValid) {
      setErrorMessage(errMsg);
      return;
    }

    createHashTag.mutate(tag);
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
