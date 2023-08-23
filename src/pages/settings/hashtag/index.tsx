import { TagForm } from '@/components/Settings/TagForm';
import { FavoriteTagList } from '@/components/Settings/FavoriteTagList';
import { useAppDispatch } from '@/store';
import { useEffect } from 'react';
import { routerSlice } from '@/store/slices/routerSlice';
import styled from 'styled-components';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { useQueryClient } from '@tanstack/react-query';
import { setAccessToken } from '@/api/customAPI';

const Wrapper = styled.div`
  margin-top: 23px;
`;

export const getServerSideProps = withAuth();

const Page = ({ accessToken, userId }: withAuthProps) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadConfigHashtag());
  }, [dispatch]);

  const queryClient = useQueryClient();
  const updateFavoriteTagList = () => {
    queryClient.invalidateQueries([userId, 'tagList']);
  };

  return (
    <Wrapper>
      <TagForm onSuccess={updateFavoriteTagList} />
      <FavoriteTagList userId={userId} />
    </Wrapper>
  );
};

export default Page;
