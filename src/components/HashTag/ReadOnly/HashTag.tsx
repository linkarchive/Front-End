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
  border-radius: 20px;
  padding: 8px 16px;
  gap: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.common.white : theme.gray.lighterGray};
  margin-right: 8px;
  min-width: 40px;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.common.black : theme.common.white};

  color: ${({ isActive, theme }) => (isActive ? theme.common.white : theme.gray.darkGray)};

  cursor: pointer;

  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
`;
