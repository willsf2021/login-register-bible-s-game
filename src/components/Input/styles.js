import styled from "styled-components";


export default styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasError"].includes(prop),
})`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  input {
    height: 55px;
    border: 1px solid ${(props) => props.theme.primary.borderColor};
    border-radius: 5px;
    font: 500 16px "Lato", sans-serif;
    padding-left: 16px;
    color: ${(props) => props.theme.gradient.lighterBlue};
    @media (min-width: 768px) {
      max-width: 400px;
    }

    ${(props) =>
      props.hasError &&
      `
      border: 2px solid ${(props) => props.theme.primary.redError};
    `}

    &:focus {
      outline: none;
      border: 1px solid transparent;
      ${(props) =>
        props.hasError &&
        `
      border: 2px solid  ${(props) => props.theme.primary.redError};
    `}
      border-radius: 5px;
      background: linear-gradient(
            ${(props) => props.theme.primary.white},
            ${(props) => props.theme.primary.white}
          )
          padding-box,
        linear-gradient(
          to right,
          ${(props) => props.theme.gradient.lighterBlue},
          ${(props) => props.theme.gradient.lighterBlue}
        ),
        border-box;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3) inset;
    }
  }

  &:valid {
    border: 2px solid ${(props) => props.theme.gradient.lighterBlue};
    ${(props) =>
      props.hasError &&
      `
      border: 2px solid  ${(props) => props.theme.primary.redError}
    `}
    background-color: hsla(205, 28%, 46%, 0.05);
  }

  .error {
    font: 600 10px "Raleway", sans-serif;
    color: ${(props) => props.theme.primary.redError};
    padding-left: 0px;
  }
`;
