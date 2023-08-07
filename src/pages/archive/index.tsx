import API from '@/api/API';
import { LinkItemWithProfileList } from '@/components/LinkItem';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import { setAccessToken } from '@/api/customAPI';
import { withAuth } from '@/lib/withAuth';
import NicknameModal from '@/components/Archive/NicknameModal';
import InfinityScroll from '@/components/Common/InfinityScroll';
import BottomNav from '@/components/BottomNav/BottomNav';

export const getServerSideProps = withAuth();

const Archive = ({
  accessToken,
  nickname,
  userId,
}: {
  accessToken: string;
  nickname: string;
  userId: string;
}) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadArchivePage());
  }, [dispatch]);

  const { isLoggedin } = useAuth();

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
      {isLoggedin && !nickname && <NicknameModal userId={userId} />}
      <BottomNav />
    </>
  );
};

export default Archive;
