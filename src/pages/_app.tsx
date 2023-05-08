import { kakaoInit } from '@/utils';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
