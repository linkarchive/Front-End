import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    width: 375px;
  }

  html, body {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    margin: auto;
  }
`;

export default GlobalStyle;
