import API from '@/api/API';
import FollowerList from '@/components/Archive/Follower/FollowerList';
import Tab from '@/components/Archive/Follower/Tab';
import useTabs from '@/hooks/useFollowerTabs';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const userId = 3; // TODO userId
  const { activeItem } = useTabs();
  const { data } = useQuery({
    queryKey: [activeItem, userId],
    queryFn: () => API.getFollowerList(userId),
    retry: 0,
  });

  const followerList = data?.data || [
    {
      userId: 1,
      nickname: 'asdf',
      introduce:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas necessitatibus nostrum itaque quae eaque. Adipisci unde doloribus fuga possimus dolorem voluptates perferendis id quia magnam ut? Facilis sint facere odio?',
      profileImageFileName: 'asdf',
      isfollow: false,
    },
  ];

  return (
    <>
      <Tab tabs={[{ text: '팔로워' }, { text: '팔로잉' }]} />
      <FollowerList followerList={followerList} />
    </>
  );
};

export default Page;
