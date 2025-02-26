import styled from "styled-components";

export default styled.div`
  p.textual {
    font-size: 12px;
    font-style: italic;
    color: ${(props) => props.theme.primary.textColor};
    padding: 4px 0 0 48px;
    max-width: 320px;
    line-height: 1.2rem;
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }
  max-width: 700px;
  background-color: ${(props) => props.theme.primary.white};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  main {
    display: flex;
    height: 100vh;
    flex-direction: column;
    padding: 56px 24px 24px;
    height: 100vh;
    flex: 1;
    row-gap: 17px;
    div.selectBibleContainer {
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      h2 {
        font-size: 20px;
        color: ${(props) => props.theme.primary.textColor};
        @media (min-width: 768px) {
          font-size: 24px;
        }
      }
    }
    div.containerTipoResposta {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    div.containerTipoReferencia {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    div.titleParagraph {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      margin-bottom: 24px;
      @media (min-width: 768px) {
        margin-bottom: 0px;
      }
    }

    textarea {
      width: 100%;
      font-family: "Raleway", sans-serif;
      font-size: 16px;
      padding: 16px;
      border-radius: 5px;
      border: 1px solid #727376;
      min-height: 136px;
      &:focus {
        outline: none;
        border-color: #727376;
      }
    }
  }
`;

export const ContainerLabelInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 16px;
  color: ${(props) => props.theme.primary.textColor};
  cursor: pointer;
  input {
    appearance: none;
    display: none;
  }
  label {
    cursor: pointer;
  }

  label.customRadio {
    height: 28px;
    width: 28px;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.primary.borderColor};
    cursor: pointer;
  }

  input:checked + label.customRadio {
    background-color: ${(props) => props.theme.gradient.lighterBlue};
    border-color: ${(props) => props.theme.gradient.darkerBlue};
  }

  label.customRadio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 18px;
    width: 18px;
    background-color: ${(props) => props.theme.primary.white};
    border-radius: 50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  input:checked + label.customRadio::after {
    background-color: ${(props) => props.theme.gradient.lighterBlue};
    transform: translate(-50%, -50%) scale(0.6);
  }
`;
