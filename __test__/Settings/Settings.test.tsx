import API from '@/api/API';
import { renderWithProviders } from '@test/utils/test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from '@test/Settings/mocks/server';
import Settings from '@/pages/settings';

describe.skip('Settings 페이지에서', () => {
  // FIXME: withAuth에 대한 테스트 추가
  setupServer();

  test('최초 렌더링시 dispatch 실행 후 status는 MAIN, current는 SETTINGS인지', () => {
    const { store } = renderWithProviders(<Settings accessToken='testToken' nickname='test' />);

    // 테스트 실행 전 초기 상태를 가져옴
    const initialStatus = store.getState().router.status;
    const initialCurrent = store.getState().router.current;

    // loadProfilePage 액션이 실행되면 status가 'MAIN'으로, current가 'SETTINGS'으로 변경
    expect(initialStatus).toBe('MAIN');
    expect(initialCurrent).toBe('SETTINGS');
  });

  test('각 텍스트들이 화면에 렌더링 되었는지', () => {
    const { getByText } = renderWithProviders(<Settings accessToken='testToken' nickname='test' />);

    // 각 텍스트 항목이 화면에 표시되는지 확인
    expect(getByText('프로필')).toBeInTheDocument();
    expect(getByText('해시태그 관리')).toBeInTheDocument();
    expect(getByText('계정')).toBeInTheDocument();
    expect(getByText('로그아웃')).toBeInTheDocument();
  });

  test('로그아웃 버튼 클릭시 deleteAllCookies 호출 및 API 요청 검사', async () => {
    // 스파이 설정
    const deleteAllCookiesSpy = jest.spyOn(API, 'deleteAllCookies');

    const { getByText } = renderWithProviders(<Settings accessToken='testToken' nickname='test' />);
    const logoutButton = getByText('로그아웃');

    // 로그아웃 버튼 클릭
    fireEvent.click(logoutButton);

    // 모든 Promise가 settle될 때까지 기다림
    await waitFor(() => {
      expect(deleteAllCookiesSpy).toHaveBeenCalled();
    });

    // deleteAllCookies 함수가 리턴한 응답이 apiResponse와 일치하는지 검사
    const response = await API.deleteAllCookies();
    expect(response.data).toEqual({ message: 'Success' });
  });
});
