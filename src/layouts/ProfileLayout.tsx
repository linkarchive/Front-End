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
  const nickname = (router.query.nickname as string) || '';

  const { data: profile } = useQuery({
    queryKey: ['user', nickname],
    queryFn: () => API.getUserProfile(nickname),
    enabled: !!nickname,
  });

  useEffect(() => {
    dispatch(routerSlice.actions.loadArchiveUser());
    return () => {
      // axios 요청 취소
      cancelSource();
    };
  }, []);

  return (
    <>
      <Profile {...profile} />
      {children}
    </>
  );
};

export default ProfileLayout;
