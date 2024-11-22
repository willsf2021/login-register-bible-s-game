import styled from "styled-components";
import { colors } from "src/services/theme.js";

export default styled.button`
  background: radial-gradient(
    circle,
    ${colors.gradient.lighterBlue} 50%,
    ${colors.gradient.darkerBlueButton} 100%
  );
  padding: 8px 24px;
  border: none;
  border-radius: 5px;
  color: white;
  font: 500 20px "Raleway", sans-serif;
  float: right;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 100%;
    float: none;
    padding: 12px 24px;
  }
`;
