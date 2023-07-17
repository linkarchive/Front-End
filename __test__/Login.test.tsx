import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import Login from '@/pages/login';

describe('로그인 페이지에서', () => {
  test('"로그인 해주세요."라는 텍스트가 렌더링 되는지', () => {
    // ARRANGE
    renderWithProviders(<Login />);

    // ACT
    const heading = screen.getByText(/로그인 해주세요./);

    // ASSERT
    expect(heading).toBeInTheDocument();
  });

  test('"kakao_login" alt를 가진 이미지가 렌더링 되는지', () => {
    // ARRANGE
    renderWithProviders(<Login />);

    // ACT
    const kakaoLoginImage = screen.getByAltText('kakao_login');

    // ASSERT
    expect(kakaoLoginImage).toBeInTheDocument();
  });
});
