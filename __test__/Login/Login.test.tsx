import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@test/utils/test-utils';
import Login from '@/pages/login';

describe.skip('로그인 페이지에서', () => {
  test('"로고가 화면에 렌더링 되는지', () => {
    // ARRANGE
    renderWithProviders(<Login />);

    // ACT
    const logo = screen.getByTestId('logo');

    // ASSERT
    expect(logo).toBeInTheDocument();
  });

  test('"kakao_login" alt를 가진 이미지가 렌더링 되는지', () => {
    // ARRANGE
    renderWithProviders(<Login />);

    // ACT
    const kakaoLoginButton = screen.getByTestId('kakao-button');

    // ASSERT
    expect(kakaoLoginButton).toBeInTheDocument();
  });
});
