import styled from "styled-components";
import { colors } from "src/services/theme";

export default styled.div`
  max-width: 700px;
  background-color: white;
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

    textarea,
    select {
      width: 100%;
      font-family: "Raleway", sans-serif;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  margin: 0 auto;
  .containerButton {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media (min-width: 768px) {
    width: 400px;
    row-gap: 32px;
    .containerButton {
      max-width: 400px;
    }
  }
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
  @media (min-width: 768px) {
    padding: 12px 24px;
  }
`;

export const ContainerLabelInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 16px;
  color: ${colors.primary.textColor};
  input {
    appearance: none;
    display: none;
  }

  label.customRadio {
    height: 28px;
    width: 28px;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    border: 1px solid ${colors.primary.borderColor};
    cursor: pointer;
  }

  input:checked + label.customRadio {
    background-color: ${colors.gradient.lighterBlue};
    border-color: ${colors.gradient.lighterBlue};
  }

  label.customRadio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 18px;
    width: 18px;
    background-color: white;
    border-radius: 50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  input:checked + label.customRadio::after {
    background-color: ${colors.gradient.lighterBlue};
    transform: translate(-50%, -50%) scale(0.6);
  }
`;
