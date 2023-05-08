import styled from 'styled-components';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <header>header</header>
      <nav>nav</nav>
      <Main>{children}</Main>
    </>
  );
};

const Main = styled.main``;

export default Layout;
