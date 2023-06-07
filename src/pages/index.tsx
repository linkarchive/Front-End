import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import CreateBtn from '@/components/Home/CreateBtn';
import { ILinkItem, ILinksResponse, LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { withAuth } from '@/lib/withAuth';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

export const getServerSideProps = withAuth();

const Home = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
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
