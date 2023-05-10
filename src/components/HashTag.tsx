import styled from 'styled-components';
import CircleXMarkSvg from './CircleXMarkBtn';

interface HashTagProps {
  title: string;
  isDeletable?: boolean;
}

const HashTag = ({ title, isDeletable }: HashTagProps) => {
  return (
    <Wrapper isDeletable={isDeletable}>
      {isDeletable && <CircleXMarkSvg />}
      <span>{title}</span>
    </Wrapper>
  );
};

HashTag.defaultProps = {
  isDeletable: false,
};

const Wrapper = styled.span<{ isDeletable?: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--hashtag-color-border);
  border-radius: 5px;
  padding: 6px 10px;

  background-color: var(--hashtag-color-background);

  color: var(--hashtag-color-text);

  ${({ isDeletable }) =>
    isDeletable &&
    `
    &:hover {
      border: 1px solid var(--hashtag-color-hover);

      svg {
        display: block;
      }
    }
  `}

  svg {
    display: none;
    position: absolute;
    top: -7px;
    right: -6px;

    &:hover {
      fill: var(--button-color-hover);
    }
  }
`;

export default HashTag;
