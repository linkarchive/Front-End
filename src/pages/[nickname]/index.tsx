import { LinkItemList } from '@/components/LinkItem';
import Nav from '@/components/Archive/User/Nav';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { ReactElement, useEffect, useState } from 'react';
import API from '@/api/API';
import { useRouter } from 'next/router';
import ProfileLayout from '@/layouts/ProfileLayout';
import { NextPageWithLayout } from '../_app';
import InfinityScroll from '@/components/Common/InfinityScroll';

const User: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const nickname = (router.query.nickname as string) || '';
  const [item, setItem] = useState<'link' | 'mark'>('link');

  const fetchLinksFn = setFetchLinksFn({ item });

  const queryKey = ['linkList', nickname, item];

  useEffect(() => {
    dispatch(routerSlice.actions.loadUserPage());
  }, [dispatch]);

  return (
    <>
      <Nav handleClick={setItem} />
      <InfinityScroll
        renderList={({ pages }) => <LinkItemList data={pages} queryKey={queryKey} />}
        queryKey={queryKey}
        fetchFn={fetchLinksFn}
        getNextPageParam={(lastPage_) => {
          const hasNext = lastPage_?.hasNext;
          if (!hasNext) return undefined;

          if (item === 'link') {
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

const setFetchLinksFn = ({ item }: { item: 'link' | 'mark' }) => {
  const fetchFunctions = {
    link: API.getLinksArchiveByUserId,
    mark: API.getMarksArchiveByUserId,
  };

  return fetchFunctions[item];
};
