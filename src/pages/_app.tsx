import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { kakaoInit } from '@/utils';
import Layout from '@/layouts';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
return (
    <>
      <Head>
        <Script src='https://developers.kakao.com/sdk/js/kakao.js' onLoad={kakaoInit} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
