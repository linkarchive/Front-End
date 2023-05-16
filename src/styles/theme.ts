const palette = {
  white: '#FFFFFF',
  lighterGray: '#CCCCCC',
  lightGray: '#C8C8C8',
  mediumGray: '#858585',
  darkGray: '#3A3A3A',
  lightBlack: '#F0F0F0',
  black: '#000000',
  lightPrimary: '#78D389',
  primary: '#4DAA7F',
  red: '#ff3535',
};

const theme = {
  default: {
    width: '375px',
  },
  fontColor: {
    white: palette.white,
    lighterGray: palette.lighterGray,
    lightGray: palette.lightGray,
    mediumGray: palette.mediumGray,
    darkGray: palette.darkGray,
    black: palette.black,
    lightPrimary: palette.lightPrimary,
    primary: palette.primary,
    red: palette.red,
  },
  fontSize: {
    xxxl: '32px',
    xxl: '24px',
    xl: '20px',
    lg: '18px',
    md: '12px',
    sm: '10px',
    xs: '8px',
  },
  buttonColor: {
    primary: palette.primary,
    default: palette.lightGray,
    hover: palette.primary,
    click: palette.lightPrimary,
  },
  backgroundColor: {
    default: palette.white,
    popup: palette.lightBlack,
  },
  borderColor: {
    black: palette.black,
    darkGray: palette.darkGray,
    mediumGray: palette.mediumGray,
    lightGray: palette.lightGray,
    lighterGray: palette.lighterGray,
  },
  SvgIconSize: {
    xxxl: '28px',
    xxl: '24px',
    xl: '20px',
    lg: '16px',
    md: '14px',
    sm: '10px',
    xs: '8px',
  },
  SvgIconColor: {
    default: palette.mediumGray,
    hover: palette.primary,
    click: palette.primary,
    active: palette.primary,
  },
  hashTagColor: {
    backgroundColor: palette.white,
    textColor: palette.mediumGray,
    borderColor: palette.mediumGray,
    borderHoverColor: palette.primary,
    activeColor: palette.primary,
    inactiveColor: palette.lightGray,
    neutralColor: palette.mediumGray,
  },
};

export default theme;
