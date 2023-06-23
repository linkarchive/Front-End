import API from '@/api/API';
import Profile from '@/components/Archive/User/Profile';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const router = useRouter();
  const nickname = (router.query.nickname as string) || '';

  const { data: profile } = useQuery({
    queryKey: ['user', nickname],
    queryFn: () => API.getUserProfile(nickname),
    enabled: !!nickname,
  });

  return (
    <>
      <Profile {...profile} />
      {children}
    </>
  );
};

export default ProfileLayout;
