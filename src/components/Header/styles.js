import styled from "styled-components";

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${({theme}) => theme.primary.white};

  header {
    background: radial-gradient(
      circle,
      ${({theme}) => theme.gradient.lighterBlue} 35%,
      ${({theme}) => theme.gradient.darkerBlue} 100%
    );
    height: 56px;
    padding: 24px 0px;
    text-align: center;
    box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);
    position: relative;

    @media (min-width: 768px) {
      position: relative;
      padding: 0px 0px;
      height: 100px;
    }

    .menuHamburger {
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      position: absolute;
      width: 40px;
      filter: drop-shadow(0px 0px 0px transparent);
      cursor: pointer;
    }
  }

  img {
    @media (min-width: 768px) {
      top: 16px;
      position: relative;
      filter: drop-shadow(
        0px 3px 0px ${({theme}) => theme.gradient.lighterBlue}
      );
      width: auto;
    }

    width: 96px;
    position: relative;
    bottom: 22px;
    filter: drop-shadow(
      0px 3px 0px ${({theme}) => theme.gradient.lighterBlue}
    );
  }
`;
