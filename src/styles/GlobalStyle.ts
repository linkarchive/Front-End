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
    font-family: 'Roboto', sans-serif;
    height: 100%;
    margin: auto;
    border-left: 1px solid black;
    border-right: 1px solid black;
    overflow: hidden;
  }
`;

export default GlobalStyle;
