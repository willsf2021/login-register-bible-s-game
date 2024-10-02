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
