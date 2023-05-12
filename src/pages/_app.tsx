import MainLayout from '@/layouts/MainLayout';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/styles';
import wrapper from '@/store';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
