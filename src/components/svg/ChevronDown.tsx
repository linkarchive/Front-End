const ChevronUpAndDown = ({ isButtonClicked }: { isButtonClicked: boolean }) => {
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

export default ChevronUpAndDown;
