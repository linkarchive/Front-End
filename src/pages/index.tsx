import CreateBtn from '@/components/Home/CreateBtn';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

// 비로그인 사용자 홈페이지
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  return (
    <div>
      비로그인 홈페이지
      <CreateBtn />
    </div>
  );
};

export default Home;
