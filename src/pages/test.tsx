import FollowingList from '@/components/Archive/User/FollwingList';
import InfinityScroll from '@/components/Common/InfinityScroll';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

const Page = () => {
  return (
    <>
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
