import Link from 'next/link';
import Title from '@/components/Title.styled';
import { Wrapper } from '../Home/HomeHeader';

const ExploreHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Link href='/explore'>
          <Title>둘러보기</Title>
        </Link>
      </nav>
    </Wrapper>
  );
};

export default ExploreHeader;
