import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import FollowerList from '@/components/Archive/Follower/FollowerList';
import Tab from '@/components/Archive/Follower/Tab';
import Header from '@/components/Header/Header';
import useTabs from '@/hooks/useFollowerTabs';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { useQuery } from '@tanstack/react-query';
import { ReactElement } from 'react';

export const getServerSideProps = withAuth();

const Page = ({ accessToken, userId: authUserId }: withAuthProps) => {
  setAccessToken(accessToken);
  const userId = 3; // TODO 조회할 유저의 userId 필요
  const nickname = '푸바오'; // TODO 조회할 유저의 nickname 필요
  const { activeItem } = useTabs();
  const { data } = useQuery({
    queryKey: [activeItem, userId],
    queryFn: () =>
      activeItem === '팔로워' ? API.getFollowerList(userId) : API.getFollowingList(userId),
    retry: 0,
    staleTime: 5000,
  });

  const followerList = data?.followResponseList || [];

  return (
    <>
      <Header title={nickname} />
      <Tab tabs={[{ text: '팔로워' }, { text: '팔로잉' }]} />
      <FollowerList authUserId={authUserId} followerList={followerList} />
    </>
  );
};

Page.getFullLayout = function getFullLayout(page: ReactElement) {
  return page;
};

export default Page;
