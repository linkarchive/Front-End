import Link from 'next/link';
import Title from '@/components/Title.styled';
import { Wrapper } from '../Home/HomeHeader';

const ArchiveHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Link href='/Archive'>
          <Title>둘러보기</Title>
        </Link>
      </nav>
    </Wrapper>
  );
};

export default ArchiveHeader;
