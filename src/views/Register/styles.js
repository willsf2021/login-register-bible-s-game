import styled from "styled-components";

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.primary.white};

  header {
    background: radial-gradient(
      circle,
      ${(props) => props.theme.gradient.lighterBlue} 35%,
      ${(props) => props.theme.gradient.darkerBlue} 100%
    );
    height: 56px;
    padding: 24px 0px;
    text-align: center;
    box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);
    @media (min-width: 768px) {
      position: relative;
      padding: 0px 0px;
      height: 100px;
    }
  }
  img {
    @media (min-width: 768px) {
      top: 16px;
      position: relative;
      filter: drop-shadow(
        0px 3px 0px ${(props) => props.theme.gradient.lighterBlue}
      );
      width: auto;
    }
    width: 96px;
    position: relative;
    bottom: 22px;
    filter: drop-shadow(
      0px 3px 0px ${(props) => props.theme.gradient.lighterBlue}
    );
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 56px 24px 24px;
    max-height: 100%;
    flex: 1;

    .containerButton {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  div.checkbox {
    input {
      width: 28px;
      box-shadow: none;
      &:focus,
      &:active {
        box-shadow: none;
      }
    }
    display: flex;
    font-size: 14px;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    position: relative;
    label {
      position: absolute;
      left: 40px;
      top: 20px;
    }
  }
  div.titleParagraph {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin-bottom: 24px;
    @media (min-width: 768px) {
      margin-bottom: 0px;
    }
  }
  div.containerWpp {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    .switch {
      position: relative;
      width: 48px;
      height: 24px;
      background-color: ${(props) => props.theme.primary.switchButton};
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
      border-radius: 15px;
      background-color: ${(props) => props.theme.primary.white};
      transition: all 0.3s ease-in-out;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      background-color: gray;
    }

    .switch input:checked + .slider {
      left: 25px;
      background-color: ${(props) => props.theme.gradient.lighterBlue};
    }

    .text {
      font-size: 12px;
      font-weight: bold;
      color: ${(props) => props.theme.primary.textColor};
    }

    .yes {
      color: ${(props) => props.theme.primary.switchButton};
      margin-right: 0px;
    }

    .no {
      margin-left: 0px;
      color: ${(props) => props.theme.gradient.lighterBlue};
    }

    input:checked ~ .no {
      color: ${(props) => props.theme.primary.switchButton};
    }

    input:checked ~ .yes {
      color: ${(props) => props.theme.gradient.lighterBlue};
    }

    input:not(:checked) ~ .yes {
      color: ${(props) => props.theme.primary.switchButton};
    }

    input:not(:checked) ~ .no {
      color: ${(props) => props.theme.gradient.lighterBlue};
    }
  }
  div.labelWpp {
    font-size: 14px;
    font-weight: 500;
    display: block;
  }
`;
