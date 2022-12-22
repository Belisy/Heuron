import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    text-align: center;
    padding: 30px;
    margin: 0;

    position: relative;
    left: 0;
    right: 0;
  }
`;

export default GlobalStyle;
