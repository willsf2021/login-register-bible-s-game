import { createGlobalStyle } from "styled-components";
import { colors } from "./services/theme";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Raleway", sans-serif;
    height: 100vh;
    background-color: ${colors.primary.backgroundDesktop};
  }
`;
