import styled from "styled-components";

export default styled.div`
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

export const ContainerLabelInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 16px;
  color: ${(props) => props.theme.primary.textColor};
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

export const SelectMenu = styled.div`
  width: 100%;
  position: relative;
  .selectBtn {
    display: flex;
    height: 56px;
    padding: 0px 16px;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #727376;
    width: 100%;
  }

  ul {
    z-index: 999;
    border: 1px solid #727376;
    width: 100%;
    position: absolute;
    padding: 8px;
    border-radius: 5px;
    margin-top: 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    opacity: ${({ $isopen }) => ($isopen ? 1 : 0)};
    transform: ${({ $isopen }) =>
      $isopen ? "translateY(0)" : "translateY(-10px)"};
    transition: opacity 0.3s ease, transform 0.3s ease;
    /* pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")}; */
    li {
      height: 32px;
      width: 100%;
      cursor: pointer;
      padding: 0 16px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
    li:hover {
      background-color: #f2f2f2;
    }
  }
`;
