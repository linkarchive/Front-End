import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';

const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
  }, [dispatch]);

  return <div>User</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // 필요한 데이터를 여기서 가져올 수 있습니다.
  // 예를 들면, API 호출 등을 여기에서 수행할 수 있습니다.

  // 이 함수에서 반환된 객체는 페이지 컴포넌트의 props로 전달됩니다.
  return {
    props: { context }, // will be passed to the page component as props
  };
};

export default User;
