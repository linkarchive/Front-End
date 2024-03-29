import styled from 'styled-components';
import BaseTag from './BaseTag';
import { PlusSvg } from '@/components/svg/Svg';
import { InputHTMLAttributes, useState } from 'react';

interface AddTagProps extends InputHTMLAttributes<HTMLInputElement> {
  hashtagInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTagClick: () => void;
  handleInputBlur: () => void;
}

const AddTag = ({
  hashtagInput,
  handleInputChange,
  handleAddTagClick,
  handleInputBlur,
  onKeyDown,
}: AddTagProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <AddTagWrapper
      onClick={() => {
        setIsEditing(true);
        handleAddTagClick();
      }}
    >
      <PlusSvg color='#FF5248' />
      {isEditing ? (
        <StyledInput
          type='text'
          value={hashtagInput}
          onChange={handleInputChange}
          onBlur={() => {
            setIsEditing(false);
            handleInputBlur();
          }}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <>태그 추가</>
      )}
    </AddTagWrapper>
  );
};

const AddTagWrapper = styled(BaseTag)`
  width: auto;
  height: 37px;
  padding: 8px 16px;

  background-color: ${({ theme }) => theme.primary.light};

  color: ${({ theme }) => theme.primary.main};
  border-radius: 20px;

  font-size: 16px;
  line-height: 18.2px;
  gap: 4px;
`;

const StyledInput = styled.input`
  width: 60px;
  height: 37px;
  outline: none;

  font-size: 16px;
  color: ${({ theme }) => theme.primary.main};
`;

export default AddTag;
