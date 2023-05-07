import MainLayout from '@/layouts/MainLayout';
import GlobalStyle from '@/styles/GlobalStyle';
// import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default App;
