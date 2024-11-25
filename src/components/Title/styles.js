import styled from "styled-components";

export const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.primary.textColor};
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;
