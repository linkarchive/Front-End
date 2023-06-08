import Link from 'next/link';
import styled from 'styled-components';
import Title from '@/components/Title.styled';
import { useRouter } from 'next/router';

const navLinks = [
  {
    path: '/',
    name: '내 링크',
  },
  { path: '/mark', name: '내 마크' },
];

const HomeHeader = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Wrapper>
      <nav>
        {navLinks.map(({ path, name }) => (
          <Link href={path} key={path}>
            <Title color={!(path === pathname) ? '#D9D9D9' : ''}>{name}</Title>
          </Link>
        ))}
      </nav>
    </Wrapper>
  );
};

export default HomeHeader;

export const Wrapper = styled.header`
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
