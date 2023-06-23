import Link from 'next/link';
import Title from '@/components/Title.styled';
import { Wrapper } from '../Home/HomeHeader';

const ArchiveHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Title>둘러보기</Title>
      </nav>
    </Wrapper>
  );
};

export default ArchiveHeader;
