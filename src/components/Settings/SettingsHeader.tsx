import Link from 'next/link';
import Title from '@/components/Title.styled';
import { Wrapper } from '../Home/HomeHeader';

const SettingsHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Link href='/settings/profile'>
          <Title>Settings</Title>
        </Link>
      </nav>
    </Wrapper>
  );
};

export default SettingsHeader;
