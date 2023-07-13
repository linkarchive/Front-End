import API from '@/api/API';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Settings = () => {
  const dispatch = useAppDispatch();

  const Logout = async () => {
    try {
      await API.deleteAllCookies();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  return (
    <>
      <Link href='/settings/profile'>
        <h3>프로필</h3>
      </Link>
      <Link href='/settings/hashtag'>
        <h3>해시태그 관리</h3>
      </Link>
      <Link href=''>
        <h3>계정</h3>
      </Link>
      <LogoutHeading onClick={Logout}>로그아웃</LogoutHeading>
    </>
  );
};

const LogoutHeading = styled.h3`
  color: #f45050;
  cursor: pointer;
`;

export default Settings;
