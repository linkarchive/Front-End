import { ILinksResponse, LinkItemList } from '@/components/LinkItem';
import Nav from '@/components/Archive/User/Nav';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { ReactElement, useEffect, useState } from 'react';
import API from '@/api/API';
import { useRouter } from 'next/router';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import ProfileLayout from '@/layouts/ProfileLayout';
import { NextPageWithLayout } from '../_app';

const User: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const nickname = (router.query.nickname as string) || '';
  const [item, setItem] = useState<'link' | 'mark'>('link');

  const fetchLinksFn = setFetchLinksFn({ item });

  const queryKey = ['linkList', nickname, item];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn: (id: string) => {
      if (nickname !== '') {
        return item === 'link'
          ? fetchLinksFn({ nickname, linkId: id })
          : fetchLinksFn({ nickname, markId: id });
      }
      return Promise.resolve(null); // 아무것도 하지 않고, Promise를 즉시 해결하는 것을 반환
    },
    queryKey,
    getNextPageParam: (lastPage_) => {
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
    },
  });

  useEffect(() => {
    dispatch(routerSlice.actions.loadUserPage());
  }, [dispatch]);

  return (
    <>
      <Nav handleClick={setItem} />
      <LinkItemList linkInfoList={pages} queryKey={queryKey} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
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
