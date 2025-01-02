import styled from "styled-components";

export default styled.div`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary.links};
    transition: all 0.3s ease;

    &:visited {
      color: ${({ theme }) => theme.primary.textColor};
    }

    &:hover {
      font-weight: 500;
    }

    &:active {
      font-weight: normal;
    }
  }
`;
