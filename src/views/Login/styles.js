import styled from "styled-components";
import { colors } from "src/services/theme";

export default styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    background: radial-gradient(
      circle,
      ${colors.gradient.lighterBlue} 35%,
      ${colors.gradient.darkerBlue} 100%
    );
    padding: 24px 0px;
    text-align: center;
    box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);

    img {
      filter: drop-shadow(0px 8px 4px rgb(21, 21, 21, 0.5));
    }
  }

  main {
    padding: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 17px;
    flex: 1;
  }

  a {
    text-decoration: none;
    color: ${colors.primary.links};
    transition: all 0.3s ease;

    &:visited {
      color: ${colors.primary.textColor};
    }

    &:hover {
      font-weight: 500;
    }

    &:active {
      font-weight: normal;
    }
  }

  footer {
    text-align: center;
    padding-bottom: 24px;

    p {
      font-size: 12px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 17px;
`;

export const Button = styled.button`
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
`;
