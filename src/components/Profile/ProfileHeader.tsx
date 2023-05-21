import Link from 'next/link';
import Title from '@/components/Title.styled';
import { Wrapper } from '../Home/HomeHeader';

const ProfileHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Link href='/user/profile'>
          <Title>My</Title>
        </Link>
      </nav>
    </Wrapper>
  );
};

export default ProfileHeader;
