import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/styles';
import wrapper, { persistor } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainLayout>
            <QueryClientProvider client={queryClient}>
              <Component {...props.pageProps} />
            </QueryClientProvider>
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
