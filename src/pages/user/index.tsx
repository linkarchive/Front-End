import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  return (
    <>
      <Link href='user/profile'>
        <h3>프로필</h3>
      </Link>
      <Link href=''>
        <h3>해시태그 관리</h3>
      </Link>
      <Link href=''>
        <h3>계정</h3>
      </Link>
      <LogoutHeading onClick={() => console.log('logout!')}>로그아웃</LogoutHeading>
    </>
  );
};

const LogoutHeading = styled.h3`
  color: #f45050;
  cursor: pointer;
`;

export default User;
