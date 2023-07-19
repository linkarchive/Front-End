import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore, Store } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState, persistedReducer } from '@/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/pages/_app';

// 이 타입 인터페이스는 RTL의 기본 render 옵션을 확장하며, initialState나 store와 같은 다른 것들을 명시함
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: Store;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // store가 전달되지 않았을 경우, 자동으로 store 인스턴스를 생성
    store = configureStore({ reducer: persistedReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    );
  };

  // store와 RTL의 모든 쿼리 함수를 포함한 객체를 반환
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
