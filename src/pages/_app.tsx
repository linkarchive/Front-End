import MainLayout from '@/layouts/MainLayout';
import { kakaoInit } from '@/utils';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit} />
      </Head>
      <GlobalStyle />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
