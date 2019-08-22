import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  Html, body, #root {
    min-height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Arial', sans-serif;
  background: linear-gradient(#22202c, #402845);
  }
  button {
    cursor: pointer;
  }

`;

export default GlobalStyles;
