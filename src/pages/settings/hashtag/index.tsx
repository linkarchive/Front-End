import { TagForm } from '@/components/Settings/TagForm';
import { FavoriteTagList } from '@/components/Settings/FavoriteTagList';
import { useAppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { routerSlice } from '@/store/slices/routerSlice';
import styled from 'styled-components';
import { withAuth } from '@/lib/withAuth';
import { useQueryClient } from '@tanstack/react-query';
import { setAccessToken } from '@/api/customAPI';

const Wrapper = styled.div`
  margin-top: 23px;
`;

export const getServerSideProps = withAuth();

const Page = ({ accessToken, nickname }: { accessToken: string; nickname: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadConfigHashtag());
  }, [dispatch]);

  const queryClient = useQueryClient();
  const updateFavoriteTagList = () => {
    queryClient.fetchQuery({
      queryKey: ['user', 'tagList', 10], // TODO 페이지네이션
    });
  };

  return (
    <Wrapper>
      <TagForm onSuccess={updateFavoriteTagList} />
      <FavoriteTagList nickname={nickname} />
    </Wrapper>
  );
};

export default Page;
