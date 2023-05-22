import LinkItem from '@/components/LinkItem';
import Nav from '@/components/Explore/User/Nav';
import Profile from '@/components/Explore/User/Profile';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';

const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  return (
    <>
      <Profile />
      <Nav />
    </>
  );
};

export default User;
