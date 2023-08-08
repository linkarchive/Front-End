import { LinkItemList } from '@/components/LinkItem';
import Nav from '@/components/Archive/User/Nav';
import { RootState, useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { ReactElement, useEffect } from 'react';
import API from '@/api/API';
import ProfileLayout from '@/layouts/ProfileLayout';
import { NextPageWithLayout } from '../_app';
import { useSelector } from 'react-redux';
import { HashTagSlice } from '@/store/slices/hashTagSlice';
import InfinityScroll from '@/components/Common/InfinityScroll';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { setAccessToken } from '@/api/customAPI';
import { useRouter } from 'next/router';

export const getServerSideProps = withAuth();

const User: NextPageWithLayout = ({ accessToken }: withAuthProps) => {
  setAccessToken(accessToken);
  const dispatch = useAppDispatch();
  const { userLink } = useSelector((state: RootState) => state.nav);
  const { selectedTagId } = useSelector((state: RootState) => state.hashTag);
  const router = useRouter();
  const userId = Number(router.query.userId);

  const fetchFn = (id: number) => {
    const tagId = selectedTagId === 0 ? undefined : selectedTagId;

    return userLink
      ? API.getLinksArchiveByUserId({ userId, linkId: id, tagId })
      : API.getMarksArchiveByUserId({ userId, markId: id, tagId });
  };

  const queryKey = ['linkList', userId, userLink, selectedTagId];

  useEffect(() => {
    dispatch(routerSlice.actions.loadUserPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(HashTagSlice.actions.setInitialState());
  }, [dispatch, userLink]);

  return (
    <>
      <Nav />
      <InfinityScroll
        renderList={({ pages }) => <LinkItemList data={pages} queryKey={queryKey} />}
        fetchFn={fetchFn}
        queryKey={queryKey}
        getNextPageParam={(lastPage_) => {
          const hasNext = lastPage_?.hasNext;
          if (!hasNext) return undefined;

          if (userLink) {
            const lastPage = lastPage_?.linkList;
            const lastItem = lastPage[lastPage.length - 1].linkId;

            return lastItem;
          }

          const lastPage = lastPage_?.markList;
          const lastItem = lastPage[lastPage.length - 1].markId;

          return lastItem;
        }}
      />
    </>
  );
};

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
