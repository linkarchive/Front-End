import React from 'react';
import styled from 'styled-components';

interface HashTagProps {
  tagName: string;
  activeTag: string;
  onClickTag: (tag: string) => void;
}

const HashTag = ({ tagName, activeTag, onClickTag }: HashTagProps) => {
  const isActive = tagName === activeTag;

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
  border: 1px solid var(--hashtag-color-inactive-border);
  border-color: ${(props) =>
    props.isActive ? 'var(--hashtag-color-active-border)' : 'var(--hashtag-color-inactive-border)'};
  margin-right: 3px;
  min-width: 40px;

  background-color: var(--hashtag-color-background);

  color: ${(props) =>
    props.isActive ? 'var(--hashtag-color-active-border)' : 'var(--hashtag-color-inactive-border)'};

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;