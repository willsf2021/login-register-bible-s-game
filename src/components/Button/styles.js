import styled from "styled-components";

export default styled.button`
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.gradient.lighterBlue} 50%,
    ${({ theme }) => theme.gradient.darkerBlueButton} 100%
  );
  
  padding: 8px 24px;
  border: none;
  border-radius: 5px;
  color: white;
  font: 500 20px "Raleway", sans-serif;
  float: right;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 100%;
    float: none;
    padding: 12px 24px;
  }
`;
