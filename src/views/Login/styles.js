import styled from "styled-components";

export default styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.primary.white};

  header {
    background: radial-gradient(
      circle,
      ${(props) => props.theme.gradient.lighterBlue} 35%,
      ${(props) => props.theme.gradient.darkerBlue} 100%
    );
    padding: 24px 0px;
    text-align: center;
    box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);
    @media (min-width: 768px) {
      position: relative;
      padding: 0px 0px;
      height: 100px;
    }

    img {
      filter: drop-shadow(0px 8px 4px rgb(21, 21, 21, 0.5));
      @media (min-width: 768px) {
        top: 16px;
        position: relative;
        filter: drop-shadow(
          0px 3px 0px ${(props) => props.theme.gradient.lighterBlue}
        );
      }
    }
  }

  main {
    padding: 56px 24px 24px;
    display: flex;
    flex-direction: column;
    row-gap: 17px;
    flex: 1;
    height: 100%;
    /* @media (min-width: 768px) {
      align-items: flex-start;
      justify-content: center;
    } */
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.primary.links};
    transition: all 0.3s ease;

    &:visited {
      color: ${(props) => props.theme.primary.textColor};
    }

    &:hover {
      font-weight: 500;
    }

    &:active {
      font-weight: normal;
    }
  }
`;
