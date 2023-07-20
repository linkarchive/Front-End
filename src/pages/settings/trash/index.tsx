import React, { useEffect } from 'react';
import { setAccessToken } from '@/api/customAPI';
import { withAuth } from '@/lib/withAuth';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import API from '@/api/API';
import { LinkItemList } from '@/components/LinkItem';
import InfinityScroll from '@/components/Common/InfinityScroll';

export const getServerSideProps = withAuth();

const Page = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadTrashPage());
  }, [dispatch]);

  const queryKey = ['trash'];

  return (
    <InfinityScroll
      renderList={({ pages }) => <LinkItemList data={pages} queryKey={queryKey} />}
      queryKey={queryKey}
      fetchFn={API.getTrashedLinks}
      getNextPageParam={(lastPage_) => {
        const hasNext = lastPage_?.hasNext;
        if (!hasNext) return undefined;
        const lastPage = lastPage_?.linkArchive;
        const lastItem = lastPage[lastPage.length - 1].linkId;

        return lastItem;
      }}
    />
  );
};

export default Page;
