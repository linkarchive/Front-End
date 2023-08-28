import API from '@/api/API';
import { setAccessToken } from '@/api/customAPI';
import FollowerList from '@/components/Archive/Follower/FollowerList';
import Tab from '@/components/Archive/Follower/Tab';
import GoBackHeader from '@/components/Common/Header/GoBackHeader';
import useTabs from '@/hooks/useFollowerTabs';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { useQuery } from '@tanstack/react-query';
import { ReactElement } from 'react';

export const getServerSideProps = withAuth();

const Page = ({ accessToken, userId: authUserId }: withAuthProps) => {
  setAccessToken(accessToken);
  const userId = 3; // TODO 조회할 유저의 userId 필요
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
      <GoBackHeader />
      <Tab tabs={[{ text: '팔로워' }, { text: '팔로잉' }]} />
      <FollowerList authUserId={String(authUserId)} followerList={followerList} />
    </>
  );
};

Page.getFullLayout = function getFullLayout(page: ReactElement) {
  return page;
};

export default Page;
