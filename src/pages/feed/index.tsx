import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(routerSlice.actions.loadArchivePage());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>피드 페이지 : 서비스 개발 예정</div>;
};

export default Feed;
