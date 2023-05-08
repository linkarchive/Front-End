import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 400px;
    position: relative;
  }

  html, body {
    font-family: "Pretendard";
    font-weight: 400;
    height: 100%;
    margin: auto;
    border-left: 1px solid black;
    border-right: 1px solid black;
    overflow: hidden;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard.woff2') format('woff2'),
         url('/fonts/Pretendard.woff') format('woff');
    font-weight: 100 900;
    font-style: normal;
    font-display: block;
  }
`;

export default GlobalStyle;
