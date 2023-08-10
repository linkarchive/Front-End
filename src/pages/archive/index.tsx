import API from '@/api/API';
import { LinkItemWithProfileList } from '@/components/LinkItem';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import { setAccessToken } from '@/api/customAPI';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import InfinityScroll from '@/components/Common/InfinityScroll';
import BottomNav from '@/components/BottomNav/BottomNav';

export const getServerSideProps = withAuth();

const Archive = ({ accessToken }: withAuthProps) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadArchivePage());
  }, [dispatch]);

  const queryKey = ['archive'];

  return (
    <>
      <InfinityScroll
        renderList={({ pages }) => <LinkItemWithProfileList data={pages} queryKey={queryKey} />}
        queryKey={queryKey}
        fetchFn={API.getLinksArchive}
        getNextPageParam={(lastPage_) => {
          const hasNext = lastPage_?.hasNext;
          if (!hasNext) return undefined;
          const lastPage = lastPage_?.linkArchive;
          const lastItem = lastPage[lastPage.length - 1].linkId;

          return lastItem;
        }}
      />
      <BottomNav />
    </>
  );
};

export default Archive;
