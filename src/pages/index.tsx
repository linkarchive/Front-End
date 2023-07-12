import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import CreateBtn from '@/components/Home/CreateBtn';
import { ILinksResponse, LinkItemList } from '@/components/LinkItem';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import LinkItemListLayout from '@/layouts/LinkItemLayout';
import { withAuth } from '@/lib/withAuth';
import { RootState, useAppDispatch } from '@/store';
import { HashTagSlice } from '@/store/slices/hashTagSlice';
import { routerSlice } from '@/store/slices/routerSlice';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(HashTagSlice.actions.setInitialState());
  }, [dispatch, myLink]);

  const queryKey = ['linkList', 'user', 'link', 'mark', myLink, selectedTagName];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn,
    queryKey,
    getNextPageParam: (lastPage_) => {
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
    },
    config: myMark && { staleTime: 0 },
  });

  return (
    <div>
      <CreateBtn />
      <LinkItemListLayout>
        <LinkItemList data={pages} queryKey={queryKey} />
      </LinkItemListLayout>
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Home;
