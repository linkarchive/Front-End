import { ChangeEvent, useEffect, useState } from 'react';
import { Block } from '@/components/Create/Create.styled';
import TextInput from '@/components/Create/TextInput';
import { validateTitle } from '@/utils/Create/validation';

const TitleInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e?: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [title, setTitle] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTitle(value);
  }, [value]);

  return (
    <Block style={{ marginBottom: '14px' }}>
      <TextInput
        id='title'
        label='제목'
        placeholder='제목을 입력하세요. (200자)'
        errorMessage={errorMessage}
        value={title}
        onChange={(e) => {
          setErrorMessage(validateTitle(e.target.value));
          setTitle(e.target.value);
          onChange(e);
        }}
        onClear={() => {
          setErrorMessage('');
          setTitle('');
          onChange();
        }}
      />
    </Block>
  );
};

export default TitleInput;
