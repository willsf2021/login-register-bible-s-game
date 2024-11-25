import styled from "styled-components";

export const StyledParagraph = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.primary.textColor};
  @media (min-width: 768px) {
    font-size: 18px;
    max-width: 400px;
  }
`;
