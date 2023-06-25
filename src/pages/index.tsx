import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import CreateBtn from '@/components/Home/CreateBtn';
import { ILinksResponse, LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { withAuth } from '@/lib/withAuth';
import { RootState, useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const getServerSideProps = withAuth();

const Home = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  const { name } = useSelector((state: RootState) => state.home);

  const fetchFn = (id: string) => {
    return name === '내 링크' ? API.getUserLinksArchive(id) : API.getUserMarksArchive(id);
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  useEffect(() => {
    fetchFn('');
  }, [name]);

  const queryKey = ['linkList', 'user', 'link', 'mark', name];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn,
    queryKey,
    getNextPageParam: (lastPage_) => {
      const hasNext = lastPage_?.hasNext;
      if (!hasNext) return undefined;

      if (name === '내 링크') {
        const lastPage = lastPage_?.linkList;
        const lastItem = lastPage[lastPage.length - 1].linkId;

        return lastItem;
      }

      const lastPage = lastPage_?.markList;
      const lastItem = lastPage[lastPage.length - 1].markId;

      return lastItem;
    },
    config: name !== '내 링크' && { staleTime: 0 },
  });

  return (
    <div>
      <CreateBtn />
      <LinkItemList data={pages} queryKey={queryKey} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </div>
  );
};

export default Home;
