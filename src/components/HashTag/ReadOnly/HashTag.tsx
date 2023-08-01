import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface HashTagProps {
  tagName: string;
  onClickTag: (tag: string) => void;
}

const HashTag = ({ tagName, onClickTag }: HashTagProps) => {
  const { selectedTagName } = useSelector((state: RootState) => state.hashTag);
  const isActive = tagName === selectedTagName;

  return (
    <Wrapper isActive={isActive} onClick={() => onClickTag(tagName)}>
      {tagName}
    </Wrapper>
  );
};

export default HashTag;

interface WrapperProps {
  isActive: boolean;
}

const Wrapper = styled.span<WrapperProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 3px 5px;
  border: 1px solid ${({ theme }) => theme.gray.lightGray};
  border-color: ${({ isActive, theme }) => (isActive ? theme.primary.main : theme.gray.lightGray)};
  margin-right: 3px;
  min-width: 40px;

  background-color: ${({ theme }) => theme.common.white};

  color: ${({ isActive, theme }) => (isActive ? theme.primary.main : theme.gray.lightGray)};

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;
