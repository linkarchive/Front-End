import { TagForm } from '@/components/Settings/TagForm';
import { FavoriteTagList } from '@/components/Settings/FavoriteTagList';
import { useAppDispatch } from '@/store';
import { useEffect } from 'react';
import { routerSlice } from '@/store/slices/routerSlice';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 23px;
`;

const Page = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadConfigHashtag());
  }, [dispatch]);

  return (
    <Wrapper>
      <TagForm />
      <FavoriteTagList usernickname='' />
    </Wrapper>
  );
};

export default Page;
