import styled from "styled-components";

export const LoginPage = styled.div`
  height: 100vh;
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DivHeader = styled.div`
  background: radial-gradient(circle, #547b96 35%, #3b5568 100%);
  padding: 24px 0px;
  text-align: center;
  box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);

  img {
    filter: drop-shadow(0px 8px 4px rgb(21, 21, 21, 0.5));
  }
`;

export const DivMain = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  flex: 1;
`;

export const CadastroLink = styled.a`
  text-decoration: none;
  color: #858585;
  transition: all 0.3s ease;

  &:visited {
    color: #858585;
  }

  &:hover {
    font-weight: 500;
  }

  &:active {
    font-weight: normal;
  }
`;

export const DivFooter = styled.div`
  text-align: center;
  padding-bottom: 24px;

  p {
    font-size: 12px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 17px;
`;

export const Button = styled.button`
  background: radial-gradient(circle, #547b96 50%, #517590 100%);
  padding: 8px 24px;
  border: none;
  border-radius: 5px;
  color: white;
  font: 500 20px "Raleway", sans-serif;
  float: right;
  cursor: pointer;
`;
