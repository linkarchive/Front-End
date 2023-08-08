import API from '@/api/API';
import Profile from '@/components/Archive/User/Profile';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { cancelSource } from '@/utils/cancelToken';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = Number(router.query.userId);

  const { data: profile } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => API.getUserProfile(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    dispatch(routerSlice.actions.loadArchiveUser());

    return () => {
      // axios 요청 취소
      cancelSource();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Profile {...profile} />
      {children}
    </>
  );
};

export default ProfileLayout;
