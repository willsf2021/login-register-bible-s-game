import styled from "styled-components";
import { colors } from "src/services/theme";

export default styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasError"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  input {
    height: 55px;
    border: 1px solid ${colors.primary.borderColor};
    border-radius: 5px;
    font: 500 16px "Lato", sans-serif;
    padding-left: 16px;
    color: ${colors.primary.lighterBlue};

    ${(props) =>
      props.hasError &&
      `
      border: 2px solid ${colors.primary.redError};
    `}

    &:focus {
      outline: none;
      border: 1px solid transparent;
      ${(props) =>
        props.hasError &&
        `
      border: 2px solid  ${colors.primary.redError};
    `}
      border-radius: 5px;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(to right, #547b96, #547b96), border-box;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) inset;
    }
  }

  &:valid {
    border: 2px solid #547b96;
    ${(props) =>
      props.hasError &&
      `
      border: 2px solid  #ff6b6b;
    `}
    background-color: hsla(205, 28%, 46%, 0.05);
  }

  .error {
    font: 600 10px "Raleway", sans-serif;
    color: #ff6b6b;
    padding-left: 0px;
  }
`;
