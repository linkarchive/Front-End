import CreateBtn from '@/components/Home/CreateBtn';
import LinkItem from '@/components/LinkItem';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadHomePage());
  }, [dispatch]);

  return (
    <div>
      <CreateBtn />

      <LinkItem />
      <LinkItem />
      <LinkItem />
      <LinkItem />
      <LinkItem />
    </div>
  );
};

export default Home;
