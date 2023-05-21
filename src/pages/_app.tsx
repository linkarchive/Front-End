import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/layouts/MainLayout';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '@/styles';
import wrapper from '@/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainLayout>
          <QueryClientProvider client={queryClient}>
            <Component {...props.pageProps} />
          </QueryClientProvider>
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
