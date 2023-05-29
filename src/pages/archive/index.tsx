import API from '@/api/API';
import { LinkItemWithProfileList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Explore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadExplorePage());
  }, [dispatch]);

  const isUser = false;
  const fetchLinksFn = isUser ? API.getAuthLinksArchive : API.getLinksArchive;

  const { pages, target, isFetchingNextPage } = useInfinityScroll({
    fetchFn: fetchLinksFn,
    queryKey: ['archive'],
    getNextPageParam: (lastPage_) => {
      const lastPage = lastPage_.data?.linkArchive;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      const hasNext = lastPage_?.data?.hasNext;

      return hasNext ? lastItem : undefined;
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
