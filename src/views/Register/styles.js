import styled from "styled-components";

export const RegisterContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const DivHeader = styled.div`
  background: radial-gradient(circle, #547b96 35%, #3b5568 100%);
  height: 56px;
  padding: 24px 0px;
  text-align: center;
  box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);
`;

export const StyledLogo = styled.img`
  position: relative;
  bottom: 22px;
  width: 96px;
  filter: drop-shadow(0px 3px 0px #547b96);
`;

export const DivMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 56px 24px 24px;
  max-height: 100%;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const CheckboxContainer = styled.div`
  input {
    width: 28px;
    box-shadow: none;
    &:focus,
    &:active {
      box-shadow: none;
    }
  }
  font-size: 14px;

  column-gap: 8px;
  display: flex;
  align-items: center;
  width: 176px;
`;

export const ContainerTitlePara = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 24px;
`;

export const CheckboxContainerWpp = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  .switch {
    position: relative;
    width: 48px;
    height: 24px;
    background-color: #ccc;
    border-radius: 15px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease-in-out;
    margin: 0 10px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: gray;
  }

  .switch input:checked + .slider {
    left: 25px;
    background-color: #547b96;
  }

  .text {
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }

  .yes {
    color: #ccc;
    margin-right: 0px;
  }

  .no {
    margin-left: 0px;
    color: #547b96;
  }

  /* Estilo do texto quando o checkbox está checked */
  input:checked ~ .no {
    color: #ccc;
  }

  input:checked ~ .yes {
    color: #547b96;
  }

  input:not(:checked) ~ .yes {
    color: #ccc;
  }

  input:not(:checked) ~ .no {
    color: #547b96;
  }
`;

export const StyledIsWhatsappLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  display: block;
`;
