import '@testing-library/jest-dom';
import Login from '../src/pages/login/index';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';

test('로그인 페이지에서 "로그인 해주세요."라는 텍스트가 렌더링 되는지', () => {
  // ARRANGE
  renderWithProviders(<Login />);

  // ACT
  const heading = screen.getByText(/로그인 해주세요./);

  // ASSERT
  expect(heading).toBeInTheDocument();
});

test('로그인 페이지에서 "kakao_login" alt를 가진 이미지가 렌더링 되는지', () => {
  // ARRANGE
  renderWithProviders(<Login />);

  // ACT
  const kakaoLoginImage = screen.getByAltText('kakao_login');

  // ASSERT
  expect(kakaoLoginImage).toBeInTheDocument();
});
