import styled from 'styled-components';
import BaseTag, { Tag } from './BaseTag';
import { CircleXMark } from '@/components/svg/Svg';

export interface HashTagProps {
  tag: Tag;
  handleClick?: (tag: Tag) => void;
  isDeletable?: boolean;
  isHighLight?: boolean;
}

interface HashTagWrapperProps {
  isHighLight?: boolean;
}

const HashTag = ({ tag, handleClick, isDeletable, isHighLight }: HashTagProps) => {
  const onClickTag = (e) => {
    e.preventDefault();

    handleClick(tag);
  };

  return (
    <HashTagWrapper onClick={onClickTag} isHighLight={isHighLight}>
      {tag.tagName}
      {isDeletable && <CircleXMark background='#DDDDDD' fill='#555555' />}
    </HashTagWrapper>
  );
};

const HashTagWrapper = styled(BaseTag)<HashTagWrapperProps>`
  padding: 6px 12px;

  background-color: ${({ isHighLight, theme }) =>
    isHighLight ? theme.gray.darkerGray : theme.gray.lightBlack};

  color: ${({ isHighLight, theme }) => (isHighLight ? theme.common.white : theme.gray.lightGray)};
  border-radius: 20px;
  gap: 8px;

  font-size: 14px;
  line-height: 19px;
`;

export default HashTag;
