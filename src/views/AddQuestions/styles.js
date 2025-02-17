import styled from "styled-components";

export default styled.div`
 
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
  
`;

export const ContainerLabelInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 16px;
  color: ${({ theme }) => theme.primary.textColor};

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
    border: 1px solid ${({ theme }) => theme.primary.borderColor};
    cursor: pointer;
  }

  input:checked + label.customRadio {
    background-color: ${({ theme }) => theme.gradient.lighterBlue};
    border-color: ${({ theme }) => theme.gradient.darkerBlue};
  }

  label.customRadio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 18px;
    width: 18px;
    background-color: ${({ theme }) => theme.primary.white};
    border-radius: 50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  input:checked + label.customRadio::after {
    background-color: ${({ theme }) => theme.gradient.lighterBlue};
    transform: translate(-50%, -50%) scale(0.6);
  }
`;
