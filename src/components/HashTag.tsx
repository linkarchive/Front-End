import styled, { css } from 'styled-components';
import CircleXMarkSvg from './CircleXMarkBtn';

interface HashTagProps {
  title: string;
  variant?: Variant;
  isDeletable?: boolean;
  onClick?: ({
    e,
    text,
  }: {
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>;
    text: string;
  }) => void;
}

type Variant = 'active' | 'inactive' | 'neutral';

const HashTag = ({ title, variant, isDeletable, onClick }: HashTagProps) => {
  return (
    <Wrapper
      variant={variant}
      isDeletable={isDeletable}
      data-hashtag={title}
      onClick={(e) => onClick && onClick({ e, text: e.currentTarget.dataset.hashtag })}
    >
      <span>{title}</span>
      {isDeletable && <CircleXMarkSvg />}
    </Wrapper>
  );
};

HashTag.defaultProps = {
  variant: 'neutral',
  isDeletable: false,
};

const Wrapper = styled.span<{ variant: Variant; isDeletable?: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 6px 10px;

  background-color: var(--hashtag-color-background);

  ${({ variant }) => HashTagVariant[variant]};

  cursor: pointer;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;

const HashTagVariant = {
  active: css`
    border: 1px solid var(--hashtag-color-active-border);

    color: var(--hashtag-color-active-text);
  `,
  inactive: css`
    border: 1px solid var(--hashtag-color-inactive-border);

    color: var(--hashtag-color-inactive-text);
  `,
  neutral: css`
    border: 1px solid var(--hashtag-color-neutral-border);

    color: var(--hashtag-color-neutral-text);
  `,
};

export default HashTag;
export { Wrapper };
