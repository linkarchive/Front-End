const PhotoSvgIcon = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.3566 21.3887H14.8006C17.9216 21.3887 19.4826 21.3887 20.6036 20.6537C21.0873 20.3367 21.5039 19.9276 21.8296 19.4497C22.5786 18.3497 22.5786 16.8167 22.5786 13.7527C22.5786 10.6877 22.5786 9.15572 21.8296 8.05572C21.5039 7.57783 21.0873 7.16872 20.6036 6.85172C19.8836 6.37872 18.9816 6.20972 17.6006 6.14972C16.9416 6.14972 16.3746 5.65972 16.2456 5.02472C16.147 4.55959 15.8909 4.14275 15.5205 3.84467C15.15 3.54658 14.6881 3.38553 14.2126 3.38872H10.9446C9.95661 3.38872 9.10561 4.07372 8.91161 5.02472C8.78261 5.65972 8.21561 6.14972 7.55661 6.14972C6.17661 6.20972 5.27461 6.37972 4.55361 6.85172C4.07023 7.16878 3.65399 7.57789 3.32861 8.05572C2.57861 9.15572 2.57861 10.6877 2.57861 13.7527C2.57861 16.8167 2.57861 18.3487 3.32761 19.4497C3.65161 19.9257 4.06761 20.3347 4.55361 20.6537C5.67461 21.3887 7.23561 21.3887 10.3566 21.3887ZM12.5786 9.66172C10.2776 9.66172 8.41161 11.4927 8.41161 13.7517C8.41161 16.0117 10.2776 17.8427 12.5786 17.8427C14.8796 17.8427 16.7456 16.0117 16.7456 13.7527C16.7456 11.4927 14.8796 9.66172 12.5786 9.66172ZM12.5786 11.2977C11.1986 11.2977 10.0786 12.3967 10.0786 13.7527C10.0786 15.1077 11.1986 16.2067 12.5786 16.2067C13.9586 16.2067 15.0786 15.1077 15.0786 13.7527C15.0786 12.3967 13.9586 11.2977 12.5786 11.2977ZM17.3006 10.4797C17.3006 10.0277 17.6736 9.66172 18.1346 9.66172H19.2446C19.7046 9.66172 20.0786 10.0277 20.0786 10.4797C20.0765 10.6986 19.9876 10.9077 19.8314 11.0611C19.6752 11.2145 19.4645 11.2996 19.2456 11.2977H18.1346C18.0261 11.2988 17.9185 11.2785 17.8179 11.2379C17.7173 11.1974 17.6256 11.1374 17.5482 11.0615C17.4707 10.9855 17.409 10.895 17.3665 10.7952C17.3241 10.6954 17.3017 10.5882 17.3006 10.4797Z'
      />
    </svg>
  );
};

const ChevronUpAndDownSvg = ({ isButtonClicked }: { isButtonClicked: boolean }) => {
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

const AlarmBellSvg = ({ color }: { color: string }) => {
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

const PlusSvg = ({ color }: { color: string }) => {
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

const ArchiveSvg = () => {
  return (
    <svg width='28' height='28' viewBox='0 0 31 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M15.293 2.50977C8.39025 2.50977 2.79297 8.10704 2.79297 15.0098C2.79297 21.9125 8.39025 27.5098 15.293 27.5098C22.1957 27.5098 27.793 21.9125 27.793 15.0098C27.793 8.10704 22.1975 2.50977 15.293 2.50977ZM19.1048 11.9472L18.0828 16.5933C17.9729 17.0893 17.5956 17.4843 17.1032 17.6118L12.3013 18.8606C11.8212 18.9845 11.3784 18.5612 11.4812 18.0776L12.5014 13.265C12.6112 12.7478 13.0115 12.3422 13.5288 12.2271L18.3077 11.1537C18.7842 11.0474 19.2093 11.4707 19.1048 11.9472Z' />
    </svg>
  );
};

const FollowSvg = () => {
  return (
    <svg
      width='22.5'
      height='25'
      viewBox='0 0 23 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.0429688 10.5098C0.0429688 5.79602 0.0429686 3.43852 1.50797 1.97477C2.97172 0.509765 5.32922 0.509766 10.043 0.509766H12.543C17.2567 0.509766 19.6142 0.509765 21.078 1.97477C22.543 3.43852 22.543 5.79602 22.543 10.5098V15.5098C22.543 20.2235 22.543 22.581 21.078 24.0448C19.6142 25.5098 17.2567 25.5098 12.543 25.5098H10.043C5.32922 25.5098 2.97172 25.5098 1.50797 24.0448C0.0429686 22.581 0.0429688 20.2235 0.0429688 15.5098V10.5098ZM3.79297 13.0098C3.79297 11.2423 3.79297 10.3585 4.34297 9.80976C4.89047 9.25976 5.77422 9.25977 7.54297 9.25977H15.043C16.8105 9.25977 17.6942 9.25976 18.243 9.80976C18.793 10.3585 18.793 11.2423 18.793 13.0098V18.0098C18.793 19.7773 18.793 20.661 18.243 21.2098C17.6942 21.7598 16.8105 21.7598 15.043 21.7598H7.54297C5.77547 21.7598 4.89172 21.7598 4.34297 21.2098C3.79297 20.6623 3.79297 19.7785 3.79297 18.0098V13.0098ZM5.04297 4.57227C4.79433 4.57227 4.55587 4.67104 4.38006 4.84685C4.20424 5.02267 4.10547 5.26113 4.10547 5.50977C4.10547 5.75841 4.20424 5.99686 4.38006 6.17268C4.55587 6.34849 4.79433 6.44727 5.04297 6.44727H11.293C11.5416 6.44727 11.7801 6.34849 11.9559 6.17268C12.1317 5.99686 12.2305 5.75841 12.2305 5.50977C12.2305 5.26113 12.1317 5.02267 11.9559 4.84685C11.7801 4.67104 11.5416 4.57227 11.293 4.57227H5.04297Z'
      />
    </svg>
  );
};

const HomeSvg = () => {
  return (
    <svg
      width='24.75'
      height='25'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21.1162 5.7863H15.2951C13.3367 5.80763 10.8452 2.79129 10.1547 1.95479C9.46419 1.11664 8.2488 0.509766 7.20234 0.509766H5.5687C2.72458 0.509766 0.418457 2.81589 0.418457 5.66001V21.4585C0.418457 23.6957 2.23252 25.5098 4.46976 25.5098H21.1162C23.3534 25.5098 25.1675 23.6957 25.1675 21.4585V9.83761C25.1675 7.60037 23.3534 5.7863 21.1162 5.7863ZM20.8341 11.3384H13.5467C13.094 11.3384 12.7266 10.971 12.7266 10.5183C12.7266 10.0656 13.094 9.69819 13.5467 9.69819H20.8341C21.2868 9.69819 21.6542 10.0656 21.6542 10.5183C21.6542 10.971 21.2868 11.3384 20.8341 11.3384Z' />
    </svg>
  );
};

const ChevronRight = () => {
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

const CheckIcon = () => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.5572 6.972L14.0708 5.48557V3.38293C14.0708 2.54842 13.394 1.87268 12.5605 1.87268H10.4579L9.028 0.442804C8.4376 -0.147601 7.48203 -0.147601 6.89162 0.442804L5.46175 1.87268H3.43949C2.60498 1.87268 1.92924 2.54941 1.92924 3.38293V5.40519L0.442804 6.89162C-0.147601 7.48203 -0.147601 8.43759 0.442804 9.028L1.92924 10.5144V12.6171C1.92924 13.4516 2.60597 14.1273 3.43949 14.1273H5.54213L6.972 15.5572C7.5624 16.1476 8.51797 16.1476 9.10838 15.5572L10.5382 14.1273H12.5605C13.395 14.1273 14.0708 13.4506 14.0708 12.6171V10.5948L15.5572 9.10837C16.1476 8.51797 16.1476 7.5624 15.5572 6.972Z'
        fill='#FF5248'
      />
      <path
        d='M6.66667 9.06667L10.6 5.13333C10.7222 5.01111 10.8778 4.95 11.0667 4.95C11.2556 4.95 11.4111 5.01111 11.5333 5.13333C11.6556 5.25556 11.7167 5.41111 11.7167 5.6C11.7167 5.78889 11.6556 5.94445 11.5333 6.06667L7.13334 10.4667C7.00001 10.6 6.84445 10.6667 6.66667 10.6667C6.4889 10.6667 6.33334 10.6 6.20001 10.4667L4.46667 8.73333C4.34445 8.61111 4.28334 8.45556 4.28334 8.26667C4.28334 8.07778 4.34445 7.92222 4.46667 7.8C4.5889 7.67778 4.74445 7.61667 4.93334 7.61667C5.12223 7.61667 5.27779 7.67778 5.40001 7.8L6.66667 9.06667Z'
        fill='white'
      />
    </svg>
  );
};

export {
  PhotoSvgIcon,
  ChevronUpAndDownSvg,
  AlarmBellSvg,
  PlusSvg,
  ArchiveSvg,
  FollowSvg,
  HomeSvg,
  ChevronRight,
  CheckIcon,
};
