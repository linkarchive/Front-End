import { LinkItemWithProfile } from '@/components/LinkItem';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';

const Explore = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadExplorePage());
  }, [dispatch]);

  return (
    <>
      <LinkItemWithProfile />
      <LinkItemWithProfile />
      <LinkItemWithProfile />
      <LinkItemWithProfile />
      <LinkItemWithProfile />
    </>
  );
};

export default Explore;
