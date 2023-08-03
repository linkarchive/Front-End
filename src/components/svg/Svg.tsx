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

export const AlarmBellSvg = ({ color }: { color: string }) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.4713 12.636H12.7668C13.7508 12.636 14.5482 11.8386 14.5482 10.8546C14.5482 9.92372 13.8336 9.15952 12.9232 9.08029V6.61594C12.9232 3.84285 10.6751 1.59473 7.902 1.59473C5.1289 1.59473 2.88078 3.84285 2.88078 6.61594V9.10431C2.05627 9.26022 1.43213 9.98403 1.43213 10.854C1.43213 11.838 2.22955 12.6355 3.21355 12.6355H12.571'
        stroke={color}
        strokeWidth='2'
        strokeMiterlimit='10'
      />
      <path
        d='M9.24344 13.5674C9.24344 14.3188 8.63412 14.9281 7.8827 14.9281C7.13129 14.9281 6.52197 14.3188 6.52197 13.5674'
        stroke={color}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
    </svg>
  );
};

export const PlusSvg = ({ color }: { color: string }) => {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.9873 1.56909V12.0691M1.7373 6.81909H12.2373'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const ChevronRight = () => {
  return (
    <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.54901 17.1336C7.87445 17.459 8.40208 17.459 8.72752 17.1336L14.5609 11.3003C14.8863 10.9748 14.8863 10.4472 14.5609 10.1218L8.72752 4.28843C8.40209 3.96299 7.87445 3.96299 7.54901 4.28843C7.22357 4.61386 7.22357 5.1415 7.54901 5.46694L12.7931 10.711L7.54901 15.9551C7.22357 16.2805 7.22357 16.8082 7.54901 17.1336Z'
        fill='#DDDDDD'
      />
    </svg>
  );
};
