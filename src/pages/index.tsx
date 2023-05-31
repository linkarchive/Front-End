import API from '@/api/API';
import CreateBtn from '@/components/Home/CreateBtn';
import { LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

// 비로그인 사용자 홈페이지
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  const { pages, target, isFetchingNextPage } = useInfinityScroll({
    fetchFn: (linkId: string) => API.getUserLinksArchive(linkId),
    queryKey: ['linkList', 'user', 'link'],
    getNextPageParam: (lastPage_) => {
      if (!lastPage_?.data?.hasNext) return undefined;
      const lastPage = lastPage_.data?.linkList;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      return lastItem;
    },
  });

  return (
    <div>
      <CreateBtn />
      <LinkItemList data={pages} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </div>
  );
};

export default Home;
