import CircleXMarkSvg from '@/components/CircleXMarkBtn';
import styled from 'styled-components';

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
  background-color: #fff;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 6px 10px;
  ${({ isDeletable }) =>
    isDeletable &&
    `
    :hover {
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
    :hover {
      fill: red;
    }
  }
`;

export default HashTag;
