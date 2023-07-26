import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import InfinityScroll from '@/components/Common/InfinityScroll';
import CreateBtn from '@/components/Home/CreateBtn';
import { HomeLinkItemList } from '@/components/LinkItem/LinkItemList';
import { withAuth } from '@/lib/withAuth';
import { RootState, useAppDispatch } from '@/store';
import { HashTagSlice } from '@/store/slices/hashTagSlice';
import { routerSlice } from '@/store/slices/routerSlice';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const getServerSideProps = withAuth();

const Home = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  const { myLink } = useSelector((state: RootState) => state.nav);
  const { selectedTagName } = useSelector((state: RootState) => state.hashTag);
  const myMark = !myLink;

  const fetchFn = (id: string) => {
    const tag = selectedTagName === 'All' ? undefined : selectedTagName;

    return myLink ? API.getUserLinksArchive(id, tag) : API.getUserMarksArchive(id, tag);
  };

  const queryKey = ['linkList', 'user', 'link', 'mark', myLink, selectedTagName];

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  useEffect(() => {
    fetchFn('');
  }, []);

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());

    return () => {
      dispatch(HashTagSlice.actions.setInitialState());
    };
  }, [dispatch, myMark]);

  return (
    <MainLayoutWrapper>
      <CreateBtn />
      <InfinityScroll
        renderList={({ pages }) => <HomeLinkItemList data={pages} queryKey={queryKey} />}
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
    </MainLayoutWrapper>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export const MainLayoutWrapper = styled.div`
  position: relative;
`;

export default Home;
