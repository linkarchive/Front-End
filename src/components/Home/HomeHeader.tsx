import Link from 'next/link';
import styled from 'styled-components';
import Title from '@/components/Title.styled';

const HomeHeader = () => {
  return (
    <Wrapper>
      <nav>
        <Link href='/'>
          <Title>내 링크</Title>
        </Link>
        <Link href='/'>
          <Title color='#D9D9D9'>내 마크</Title>
        </Link>
      </nav>
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.header`
  nav {
    display: flex;
    align-items: center;

    height: 48px;
    padding: 0 26px;

    > a {
      margin-right: 8px;
    }

    a {
      text-decoration: none;
    }
  }
`;
