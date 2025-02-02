import styled from "styled-components";

export default styled.div`
  header {
    border-bottom: 1px solid ${({ theme }) => theme.primary.borderColor};
    padding: 56px 24px 0px;
    background-color: ${({ theme }) => theme.primary.white};
    width: 100vw;
    position: fixed;

    ul {
      display: flex;
      column-gap: 32px;
      list-style: none;
      font-weight: 600;
      cursor: pointer;
    }
  }
  section {
    padding-top: 56px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.primary.backgroundDesktop};
  }
`;

export const Li = styled.li`
  padding-bottom: 8px;
  ${(props) =>
    props.isActive
      ? `color: ${props.theme.gradient.lighterBlue}; border-bottom: 3px solid ${props.theme.gradient.lighterBlue}; `
      : `color: ${props.theme.primary.textColor}; border-bottom: 3px solid $transparent; `}
`;
