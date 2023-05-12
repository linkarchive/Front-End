// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  // variables
  :root {
    --font-color-white: ${theme.fontColor.white};
    --font-color-lightergray: ${theme.fontColor.lighterGray};
    --font-color-lightgray: ${theme.fontColor.lightGray};
    --font-color-mediumgray: ${theme.fontColor.mediumGray};
    --font-color-darkgray: ${theme.fontColor.darkGray};
    --font-color-black: ${theme.fontColor.black};
    --font-color-light-primary: ${theme.fontColor.lightPrimary};
    --font-color-primary: ${theme.fontColor.primary};
    --font-color-warn:${theme.fontColor.red};

    --font-size-xxxl: ${theme.fontSize.xxxl};
    --font-size-xxl: ${theme.fontSize.xxl};
    --font-size-xl: ${theme.fontSize.xl};
    --font-size-lg: ${theme.fontSize.lg};
    --font-size-md: ${theme.fontSize.md};
    --font-size-sm: ${theme.fontSize.sm};
    --font-size-xs: ${theme.fontSize.xs};

    --button-color-primary: ${theme.buttonColor.primary};
    --button-color-default: ${theme.buttonColor.default};
    --button-color-disabled: ${theme.buttonColor.default};
    --button-color-hover: ${theme.buttonColor.hover};
    --button-color-click: ${theme.buttonColor.click};

    --background-color-default: ${theme.backgroundColor.default};
    --background-color-popup: ${theme.backgroundColor.popup};

    --border-color-black: ${theme.borderColor.black};
    --border-color-darkgray: ${theme.borderColor.darkGray};
    --border-color-gray: ${theme.borderColor.mediumGray};
    --border-color-lightgray: ${theme.borderColor.lightGray};
    --border-color-lighter-gray: ${theme.borderColor.lighterGray};

    --default-width: ${theme.default.width};

    --svg-width-xxl: ${theme.SvgIconSize.xxl};
    --svg-height-xxl: ${theme.SvgIconSize.xxl};
    --svg-width-md: ${theme.SvgIconSize.md};
    --svg-height-md: ${theme.SvgIconSize.md};
    --svg-color-default: ${theme.SvgIconColor.default};
    --svg-color-hover: ${theme.SvgIconColor.hover};
    --svg-color-click: ${theme.SvgIconColor.click};
    --svg-color-active: ${theme.SvgIconColor.active};

    --hashtag-color-text: ${theme.hashTagColor.textColor};
    --hashtag-color-border: ${theme.hashTagColor.borderColor};
    --hashtag-color-background: ${theme.hashTagColor.backgroundColor};
    --hashtag-color-hover: ${theme.hashTagColor.borderHoverColor};

  }
`;

export default GlobalStyle;
