import { LinkItemList } from '@/components/LinkItem';
import Nav from '@/components/Archive/User/Nav';
import { RootState, useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { ReactElement, useEffect } from 'react';
import API from '@/api/API';
import { useRouter } from 'next/router';
import ProfileLayout from '@/layouts/ProfileLayout';
import { NextPageWithLayout } from '../_app';
import { useSelector } from 'react-redux';
import { HashTagSlice } from '@/store/slices/hashTagSlice';
import InfinityScroll from '@/components/Common/InfinityScroll';

const User: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const { userLink } = useSelector((state: RootState) => state.nav);
  const { selectedTagName } = useSelector((state: RootState) => state.hashTag);
  const router = useRouter();

  const nickname = (router.query.nickname as string) || '';

  const fetchFn = (id: string) => {
    const tag = selectedTagName === 'All' ? undefined : selectedTagName;

    return userLink
      ? API.getLinksArchiveByUserId({ nickname, linkId: id, tag })
      : API.getMarksArchiveByUserId({ nickname, markId: id, tag });
  };

  const queryKey = ['linkList', nickname, userLink, selectedTagName];

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
