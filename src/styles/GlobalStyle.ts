import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    font-family: 'Roboto', sans-serif;
    width: 400px;
    height: 100%;
    margin: auto;
    background-color: #cccccc;
    border-left: 1px solid black;
    border-right: 1px solid black;
    overflow: hidden;
  }
`;

export default GlobalStyle;
