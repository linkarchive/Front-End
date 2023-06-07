import API from '@/api/API';
import { ILinksResponse, LinkItemWithProfileList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
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

  const isUser = false;
  const fetchLinksFn = isUser ? API.getAuthLinksArchive : API.getLinksArchive;

  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn: fetchLinksFn,
    queryKey: ['archive'],
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
      <LinkItemWithProfileList data={pages} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </Wrapper>
  );
};

export default Explore;

const Wrapper = styled.div`
  overflow: scroll;
  height: 100%;
`;
