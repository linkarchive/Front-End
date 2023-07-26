import Link from 'next/link';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 80px;

  border-bottom: 1px solid #c8c8c8;

  color: #0a1034;
`;

const StyledLink = styled(Link)`
  color: #3a3a3a;
  font-size: 12px;
  font-weight: 400;
`;

export const FavoriteTag = ({ tag }: { tag: string }) => {
  return (
    <Item>
      <div>{tag}</div>
      <div>
        <StyledLink href='#'>수정</StyledLink>
      </div>
    </Item>
  );
};
