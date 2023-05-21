import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { userSlice } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// 아래 로직들은 지워도 무방합니다(테스트용)
const dummyData = {
  id: 10,
  name: '홍길동',
};

const Explore = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClick = () => {
    dispatch(userSlice.actions.getSelectedUserData(dummyData));
    router.push(`/user/${dummyData.id}`);
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadExplorePage());
  }, [dispatch]);

  return (
    <div>
      <div onClick={onClick}>{dummyData.name}</div>
    </div>
  );
};

export default Explore;
