import API from '@/api/API';
import { LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  const { pages, target, isFetchingNextPage } = useInfinityScroll({
    fetchFn: (linkId: string) => API.getUserMarksArchive(linkId),
    queryKey: ['linkList', 'user', 'mark'],
    getNextPageParam: (lastPage_) => {
      if (!lastPage_?.data?.hasNext) return undefined;
      const lastPage = lastPage_.data?.linkList;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      return lastItem;
    },
  });

  return (
    <div>
      <LinkItemList data={pages} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </div>
  );
};

export default Home;
