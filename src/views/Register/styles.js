import styled from "styled-components";
import { colors } from "src/services/theme";

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0 auto;
  justify-content: space-between;
  
  header {
    background: radial-gradient(
      circle,
      ${colors.gradient.lighterBlue} 35%,
      ${colors.gradient.darkerBlue} 100%
    );
    height: 56px;
    padding: 24px 0px;
    text-align: center;
    box-shadow: 0px 4px 16px 0px rgba(21, 21, 21, 0.3);
  }
  img {
    position: relative;
    bottom: 22px;
    width: 96px;
    filter: drop-shadow(0px 3px 0px ${colors.gradient.lighterBlue});
  }
  main {
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
      background-color: ${colors.primary.switchButton};
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
      background-color: white;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      background-color: gray;
    }

    .switch input:checked + .slider {
      left: 25px;
      background-color: ${colors.gradient.lighterBlue};
    }

    .text {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }

    .yes {
      color: ${colors.primary.switchButton};
      margin-right: 0px;
    }

    .no {
      margin-left: 0px;
      color: ${colors.gradient.lighterBlue};
    }

    input:checked ~ .no {
      color: ${colors.primary.switchButton};
    }

    input:checked ~ .yes {
      color: ${colors.gradient.lighterBlue};
    }

    input:not(:checked) ~ .yes {
      color: ${colors.primary.switchButton};
    }

    input:not(:checked) ~ .no {
      color: ${colors.gradient.lighterBlue};
    }
  }

  footer {
    text-align: center;
    padding-bottom: 24px;
    p {
      font-size: 12px;
    }
  }
  div.labelWpp {
    font-size: 14px;
    font-weight: 500;
    display: block;
  }
`;
