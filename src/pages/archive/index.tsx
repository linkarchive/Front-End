import API from '@/api/API';
import { LinkItemWithProfileList } from '@/components/LinkItem';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Explore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadExplorePage());
  }, [dispatch]);

  const isUser = false;
  const fetchLinksFn = isUser ? API.getAuthLinksArchive : API.getLinksArchive;
  const target = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['archive'],
    queryFn: ({ pageParam }) => {
      return fetchLinksFn(pageParam || '');
    },
    getNextPageParam: (lastPage_) => {
      const lastPage = lastPage_.data?.linkArchive;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      const hasNext = lastPage_?.data?.hasNext;

      return hasNext ? lastItem : undefined;
    },
    retry: 1,
  });

  const pages = data?.pages || [];

  const handleIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          hasNextPage && fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );
  useIntersectionObserver({ target, onIntersection: handleIntersection });

  return (
    <Wrapper>
      {pages.map(({ data: { linkArchive } }) => (
        <LinkItemWithProfileList linkList={linkArchive} key='' />
      ))}
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
