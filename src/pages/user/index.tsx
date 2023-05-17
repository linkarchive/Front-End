import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';

const userId = 1;

const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  return (
    <>
      <Link href={`user/${userId}/profile`}>
        <h3>프로필</h3>
      </Link>
      <Link href=''>
        <h3>해시태그 관리</h3>
      </Link>
      <Link href=''>
        <h3>계정</h3>
      </Link>
    </>
  );
};

export default User;
