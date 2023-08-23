import { useCallback, useRef } from 'react';
import { QueryKey, UseInfiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

// TODO any 개선
/* eslint-disable @typescript-eslint/no-explicit-any */
interface IuseInfinityScroll {
  queryKey: QueryKey;
  fetchFn: (param?: unknown) => Promise<AxiosResponse<any, any>>;
  getNextPageParam?: (lastPage: any, pages: any) => any;
  config?: UseInfiniteQueryOptions<unknown, unknown, unknown, unknown, QueryKey>;
}

const useInfinityScroll = <TPage>({
  queryKey,
  fetchFn,
  getNextPageParam,
  config,
}: IuseInfinityScroll) => {
  const target = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return fetchFn({ linkId: pageParam } || '');
    },
    getNextPageParam: (lastPage, pages) => getNextPageParam(lastPage, pages),
    staleTime: 5000,
    retry: 1,
    ...config,
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
export type { IuseInfinityScroll };
