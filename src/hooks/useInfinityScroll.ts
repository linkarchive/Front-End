import { useCallback, useRef } from 'react';
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// TODO any 개선
/* eslint-disable @typescript-eslint/no-explicit-any */
interface IuseInfinityScroll {
  queryKey: QueryKey;
  fetchFn: (param?: unknown) => Promise<AxiosResponse<any, any>>;
  getNextPageParam?: (lastPage: any, pages: any) => any;
}

const useInfinityScroll = <TPage>({ queryKey, fetchFn, getNextPageParam }: IuseInfinityScroll) => {
  const target = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return fetchFn(pageParam || '');
    },
    getNextPageParam: (lastPage, pages) => getNextPageParam(lastPage, pages),
    retry: 1,
  });

  const pages = (data?.pages as TPage[]) || [];

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

  return { pages, target, isFetchingNextPage };
};

export default useInfinityScroll;
