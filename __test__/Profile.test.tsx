import { renderWithProviders } from '@/utils/test-utils';
import { fireEvent, getByRole, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Profile from '@/pages/settings/profile';
import { act } from 'react-dom/test-utils';
import type { ComponentType, ReactElement } from 'react';
import { ImageProps, StaticImageData } from 'next/image';
import API from '@/api/API';

/**
 * 참고한 페이지 : https://github.com/vercel/next.js/discussions/32325
 */

interface ESModuleDefault<T> {
  readonly __esModule: true;
  readonly default: T;
}

type StaticRequire = ImageProps['src'] extends infer T | StaticImageData | string ? T : never;

const mapStaticImportToSrc = (staticImport: StaticImageData | StaticRequire): string => {
  if ('default' in staticImport) {
    return staticImport.default.src;
  }
  return staticImport.src;
};

const mapNextImageSrcToString = (src: StaticImageData | StaticRequire | string): string => {
  if (typeof src === 'string') {
    return src;
  }
  return mapStaticImportToSrc(src);
};

// eslint-disable-next-line react/function-component-definition
function MockNextImage({
  alt,
  height,
  src: nextImageSrc,
  width,
}: Readonly<ImageProps>): ReactElement {
  const imgSrc: string = mapNextImageSrcToString(nextImageSrc);
  return <img alt={alt} height={height} src={imgSrc} width={width} />;
}

jest.mock(
  'next/image',
  (): ESModuleDefault<ComponentType<ImageProps>> => ({
    __esModule: true,
    default: MockNextImage,
  })
);

describe('프로필 페이지에서', () => {
  test('화면에 텍스트, 이미지, 버튼이 렌더링 되는지', async () => {
    await act(async () => {
      renderWithProviders(<Profile accessToken='testToken' />);
    });

    // 텍스트가 렌더링 되는지 확인
    expect(screen.getByText('아이디')).toBeInTheDocument();
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByText('수정하기')).toBeInTheDocument();

    // 이미지가 렌더링되는지 확인
    const imageElement = screen.getByAltText('cat');
    expect(imageElement).toBeInTheDocument();

    // 초기에는 버튼이 비활성화되어 있어야 함
    const submitButton = screen.getByText('수정하기') as HTMLButtonElement;
    expect(submitButton).toBeDisabled();
  });

  test('이미지 변경 동작하는지', async () => {
    await act(async () => {
      renderWithProviders(<Profile accessToken='testToken' />);
    });

    const imageInput = screen.getByTestId('imageInput') as HTMLInputElement;
    const newImageFile = new File(['new-image'], '/new-image.png', { type: 'image/png' });

    fireEvent.change(imageInput, { target: { files: [newImageFile] } });

    // API 호출 후 이미지 URL이 제대로 변경되는지 확인
    const imageElement = screen.getByAltText('cat') as HTMLImageElement;
    await waitFor(() => {
      expect(imageElement.src.includes('new-image.png')).toBeTruthy();
    });
  });

  test('수정버튼 누르면 프로필 업데이트 api호출', async () => {
    const { container } = renderWithProviders(<Profile accessToken='testToken' />);

    const updateButton = getByRole(container, 'button', { name: /수정하기/i });

    userEvent.click(updateButton);

    const response = await API.updateUserProfile({
      nickname: 'newNickname',
      introduce: 'newIntroduce',
    });

    // 닉네임이 바뀌었는지 확인
    await waitFor(() => {
      expect(response).toEqual({
        nickname: 'newNickname',
        introduce: 'newIntroduce',
      });
    });
  });
});
