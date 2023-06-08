import API from '@/api/API';
import { ILinksResponse, LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

const Mark = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  const queryKey = ['linkList', 'user', 'mark'];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn: (linkId: string) => API.getUserMarksArchive(linkId),
    queryKey,
    getNextPageParam: (lastPage_) => {
      if (!lastPage_?.data?.hasNext) return undefined;
      const lastPage = lastPage_.data?.linkList;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      return lastItem;
    },
  });

  return (
    <div>
      <LinkItemList data={pages} queryKey={queryKey} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </div>
  );
};

export default Mark;
