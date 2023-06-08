import API from '@/api/API';
import { ILinksResponse, LinkItemWithProfileList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { setAccessToken } from '@/api/customAPI';
import { withAuth } from '@/lib/withAuth';

export const getServerSideProps = withAuth();

const Explore = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadExplorePage());
  }, [dispatch]);

  const { isLoggedin } = useAuth();
  const fetchLinksFn = isLoggedin ? API.getAuthLinksArchive : API.getLinksArchive;

  const queryKey = ['archive'];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn: fetchLinksFn,
    queryKey,
    getNextPageParam: (lastPage_) => {
      const hasNext = lastPage_?.hasNext;
      if (!hasNext) return undefined;
      const lastPage = lastPage_?.linkArchive;
      const lastItem = lastPage[lastPage.length - 1].linkId;

      return lastItem;
    },
  });

  return (
    <Wrapper>
      <LinkItemWithProfileList data={pages} queryKey={queryKey} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </Wrapper>
  );
};

export default Explore;

const Wrapper = styled.div`
  height: 100%;
`;
