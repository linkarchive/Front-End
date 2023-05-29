import CreateBtn from '@/components/Home/CreateBtn';
import NicknameInputPopup from '@/components/NicknameInputPopup';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 로그인된 사용자 홈페이지
const Home = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const NICKNAME = router.query.nickname as string;

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  return (
    <div>
      {NICKNAME}의 홈입니다.
      <CreateBtn />
    </div>
  );
};

export default Home;
