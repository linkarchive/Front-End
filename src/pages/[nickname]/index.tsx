import { ILinksResponse, LinkItemList } from '@/components/LinkItem';
import Nav from '@/components/Archive/User/Nav';
import Profile from '@/components/Archive/User/Profile';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '@/api/API';
import { useRouter } from 'next/router';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import useAuth from '@/hooks/useAuth';
import { setAccessToken } from '@/api/customAPI';
import { withAuth } from '@/lib/withAuth';

export const getServerSideProps = withAuth();

const User = ({ accessToken }: { accessToken: string }) => {
  setAccessToken(accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  const router = useRouter();
  const nickname = (router.query.nickname as string) || '';
  const [item, setItem] = useState<'link' | 'mark'>('link');
  const { isLoggedin } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['user', nickname, item],
    queryFn: () => API.getUserProfile(nickname),
    enabled: !!nickname,
  });

  const fetchLinksFn = setFetchLinksFn({ isLoggedin, item });
  const queryKey = ['linkList', nickname, item];
  const { pages, target, isFetchingNextPage } = useInfinityScroll<ILinksResponse>({
    fetchFn: (linkId: string) => fetchLinksFn({ nickname, linkId }),
    queryKey,
    getNextPageParam: (lastPage_) => {
      if (!lastPage_?.data?.hasNext) return undefined;
      const lastPage = lastPage_.data?.linkList;
      const lastItem = lastPage[lastPage.length - 1].urlId;
      return lastItem;
    },
  });

  return (
    <>
      <Profile {...profile} />
      <Nav handleClick={setItem} />
      <LinkItemList data={pages} queryKey={queryKey} />
      {isFetchingNextPage && <div>로딩중...</div>}
      <div ref={target} />
    </>
  );
};

export default User;

const setFetchLinksFn = ({ isLoggedin, item }: { isLoggedin: boolean; item: 'link' | 'mark' }) => {
  if (isLoggedin) {
    if (item === 'link') return API.getAuthLinksArchiveByUserId;
    return API.getAuthMarksArchiveByUserId;
  }
  if (item === 'link') return API.getLinksArchiveByUserId;
  return API.getMarksArchiveByUserId;
};
