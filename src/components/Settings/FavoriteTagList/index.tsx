import styled from 'styled-components';
import { FavoriteTag } from './FavoriteTag';
import { useQuery } from '@tanstack/react-query';
import API from '@/api/API';
import { useFetchTagsByNickname } from '@/queries';

const Title = styled.p`
  display: block;

  margin-bottom: 8px;

  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: var(--font-color-darkGray);
`;

const List = styled.ul`
  width: 100%;
`;

const InputBlock = styled.div`
  width: 327px;
  padding: 0 5px;
  margin: 0 auto;
`;

export const FavoriteTagList = ({ nickname }: { nickname: string }) => {
  const { data: tagListData } = useFetchTagsByNickname({ nickname });
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
