import API from '@/api/API';
import LinkItemList from '@/components/LinkItem/LinkItemLits';
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

  const target = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['archive'],
    queryFn: ({ pageParam }) => {
      return API.getLinksArchive(pageParam);
    },
    getNextPageParam: (lastPage_) => {
      const lastPage = lastPage_.data; // lastPage_.data.result.linkArchive; /** 실제 리소스 */
      const lastItem = lastPage[lastPage.length - 1].urlId; // lastPage[lastPage.length - 1].urlId; /** 실제 리소스 */
      const isNextPage = true; // TODO 불러올 데이터 유무 추가

      return isNextPage ? lastItem : undefined;
    },
    retry: 1,
  });
  const linkList = data?.pages || []; // data?.pages[0].data.result?.linkArchive || [];  /** 실제 리소스 */

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
      {linkList.map(({ data: items }) => (
        <LinkItemList key={items[0].urlId} linkList={items} />
      ))}
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target}>마지막</div>
    </Wrapper>
  );
};

export default Explore;

const Wrapper = styled.div`
  overflow: scroll;
  height: 100%;
`;
