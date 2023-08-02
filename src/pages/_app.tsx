import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import wrapper, { persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { System } from '@/layouts/System';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import palette from '@/styles/palette';

export const queryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={palette}>
          <System />
          <MainLayout>
            <QueryClientProvider client={queryClient}>
              {getLayout(<Component {...props.pageProps} />)}
            </QueryClientProvider>
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
