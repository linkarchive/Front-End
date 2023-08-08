import styled from 'styled-components';
import { FavoriteTag } from './FavoriteTag';
import { useFetchTagsByUserId } from '@/queries';

const Title = styled.p`
  display: block;

  margin-bottom: 8px;

  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.gray.darkGray};
`;

const List = styled.ul`
  width: 100%;
`;

const InputBlock = styled.div`
  width: 327px;
  padding: 0 5px;
  margin: 0 auto;
`;

export const FavoriteTagList = ({ userId }: { userId: number }) => {
  const { data: tagListData } = useFetchTagsByUserId({ userId });
  const tagList = tagListData?.tagList || [];

  return (
    <InputBlock>
      <Title>자주 사용하는 태그</Title>
      <List>
        {tagList.map(({ tagId, tagName }) => (
          <FavoriteTag key={tagId} tag={tagName} />
        ))}
      </List>
    </InputBlock>
  );
};
