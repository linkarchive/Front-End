import FollowingList from '@/components/Archive/Follower/FollwingList';
import Tab from '@/components/Archive/Follower/Tab';
import useTabs from '@/hooks/useFollowerTabs';

const Page = () => {
  const { activeItem } = useTabs();

  return (
    <>
      <Tab tabs={[{ text: '팔로워' }, { text: '팔로잉' }]} />
      <FollowingList />
      {/* 
    <InfinityScroll
      renderList={({ pages }) => <FollowingList />}
      queryKey={['']}
      fetchFn={}
    />
    */}
    </>
  );
};

export default Page;
