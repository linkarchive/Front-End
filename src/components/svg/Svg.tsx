export const PhotoSvgIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' data-testid='photo-svg-icon'>
      <path d='M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
    </svg>
  );
};

export const ChevronUpAndDownSvg = ({ isButtonClicked }: { isButtonClicked: boolean }) => {
  return !isButtonClicked ? (
    <svg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.891968' y='0.833008' width='33' height='33' rx='16.5' fill='white' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M25.0991 13.6259C25.4896 14.0164 25.4896 14.6496 25.0991 15.0401L18.0991 22.0401C17.7085 22.4306 17.0754 22.4306 16.6849 22.0401L9.68486 15.0401C9.29433 14.6496 9.29433 14.0164 9.68486 13.6259C10.0754 13.2354 10.7085 13.2354 11.0991 13.6259L17.392 19.9188L23.6849 13.6259C24.0754 13.2354 24.7086 13.2354 25.0991 13.6259Z'
        fill='#858585'
      />
      <rect x='0.891968' y='0.833008' width='33' height='33' rx='16.5' stroke='#DDDDDD' />
    </svg>
  ) : (
    <svg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='33.892'
        y='33.833'
        width='33'
        height='33'
        rx='16.5'
        transform='rotate(-180 33.892 33.833)'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.68486 21.0401C9.29434 20.6496 9.29434 20.0164 9.68486 19.6259L16.6849 12.6259C17.0754 12.2354 17.7085 12.2354 18.0991 12.6259L25.0991 19.6259C25.4896 20.0164 25.4896 20.6496 25.0991 21.0401C24.7086 21.4306 24.0754 21.4306 23.6849 21.0401L17.392 14.7472L11.0991 21.0401C10.7085 21.4306 10.0754 21.4306 9.68486 21.0401Z'
        fill='#858585'
      />
      <rect
        x='33.892'
        y='33.833'
        width='33'
        height='33'
        rx='16.5'
        transform='rotate(-180 33.892 33.833)'
        stroke='#DDDDDD'
      />
    </svg>
  );
};

export const AlarmBellSvg = () => {
  return (
    <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.4902 7.56909C14.4902 5.08381 12.4755 3.06909 9.99023 3.06909C7.50495 3.06909 5.49023 5.08381 5.49023 7.56909V12.0691L3.99023 13.5691H15.9902L14.4902 12.0691V7.56909Z'
        stroke='#858585'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M9.99023 17.3191C11.2329 17.3191 12.2402 16.3117 12.2402 15.0691H7.74023C7.74023 16.3117 8.74759 17.3191 9.99023 17.3191Z'
        fill='#858585'
      />
    </svg>
  );
};

export const PlusSvg = () => {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.9873 1.56909V12.0691M1.7373 6.81909H12.2373'
        stroke='#858585'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
