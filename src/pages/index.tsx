import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import InfinityScroll from '@/components/Common/InfinityScroll';
import { HomeLinkItemList } from '@/components/LinkItem/LinkItemList';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { RootState, useAppDispatch } from '@/store';
import { hashTagSlice } from '@/store/slices/hashTagSlice';
import { routerSlice } from '@/store/slices/routerSlice';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const getServerSideProps = withAuth();

const Home = ({ accessToken }: withAuthProps) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  const { myLink } = useSelector((state: RootState) => state.nav);
  const { selectedTagId } = useSelector((state: RootState) => state.hashTag);
  const myMark = !myLink;

  const fetchFn = (id: number) => {
    const tagId = selectedTagId === 0 ? undefined : selectedTagId;

    return myLink ? API.getUserLinksArchive(id, tagId) : API.getUserMarksArchive(id, tagId);
  };

  const queryKey = ['linkList', 'user', 'link', 'mark', myLink, selectedTagId];

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());

    return () => {
      dispatch(hashTagSlice.actions.setInitialState());
    };
  }, [dispatch, myMark]);

  return (
    <MainLayoutWrapper>
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
  height: 100%;
`;

export default Home;
