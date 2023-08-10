import styled from 'styled-components';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import BaseTag, { Tag } from './BaseTag';

interface FilteringTagProps {
  tag: Tag;
  handleClick?: (tag: Tag) => void;
}

interface FilteringTagWrapperProps {
  isActive: boolean;
}

const FilteringTag = ({ tag, handleClick }: FilteringTagProps) => {
  const { selectedTagId } = useSelector((state: RootState) => state.hashTag);
  const { tagId, tagName } = tag;
  const isActive = tagId === selectedTagId;

  return (
    <FilteringTagWrapper isActive={isActive} onClick={() => handleClick({ tagId, tagName })}>
      {tagName}
    </FilteringTagWrapper>
  );
};

const FilteringTagWrapper = styled(BaseTag)<FilteringTagWrapperProps>`
  border-radius: 20px;
  padding: 8px 16px;
  gap: 8px;
  height: 34px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isActive, theme }) =>
    isActive ? theme.common.black : theme.gray.lighterGray};

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.common.black : theme.common.white};

  color: ${({ isActive, theme }) => (isActive ? theme.common.white : theme.gray.darkGray)};
  font-size: 14px;
  line-height: 18.2px;
`;

export default FilteringTag;
