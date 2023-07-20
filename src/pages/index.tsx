import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import InfinityScroll from '@/components/Common/InfinityScroll';
import CreateBtn from '@/components/Home/CreateBtn';
import { LinkItemList } from '@/components/LinkItem';
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
  const myLink = name === '내 링크';
  const myMark = !myLink;

  const fetchFn = (id: string) => {
    return myLink ? API.getUserLinksArchive(id) : API.getUserMarksArchive(id);
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  useEffect(() => {
    fetchFn('');
  }, [name]);

  const queryKey = ['linkList', 'user', 'link', 'mark', name];

  return (
    <div>
      <CreateBtn />
      <InfinityScroll
        renderList={({ pages }) => <LinkItemList data={pages} queryKey={queryKey} />}
        fetchFn={fetchFn}
        queryKey={queryKey}
        getNextPageParam={(lastPage_) => {
          const hasNext = lastPage_?.hasNext;
          if (!hasNext) return undefined;

          if (myLink) {
            const lastPage = lastPage_?.linkList;
            const lastItem = lastPage[lastPage.length - 1].linkId;

            return lastItem;
          }

          const lastPage = lastPage_?.markList;
          const lastItem = lastPage[lastPage.length - 1].markId;

          return lastItem;
        }}
        config={myMark && { staleTime: 0 }}
      />
    </div>
  );
};

export default Home;
