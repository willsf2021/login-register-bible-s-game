import styled from "styled-components";

export default styled.div`
  .containerButton {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
      top: 12px;
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
      background-color: ${({ theme }) => theme.primary.switchButton};
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
      background-color: ${({ theme }) => theme.primary.white};
      transition: all 0.3s ease-in-out;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      background-color: gray;
    }

    .switch input:checked + .slider {
      left: 25px;
      background-color: ${({ theme }) => theme.gradient.lighterBlue};
    }

    .text {
      font-size: 12px;
      font-weight: bold;
      color: ${({ theme }) => theme.primary.textColor};
    }

    .yes {
      color: ${({ theme }) => theme.primary.switchButton};
      margin-right: 0px;
    }

    .no {
      margin-left: 0px;
      color: ${({ theme }) => theme.gradient.lighterBlue};
    }

    input:checked ~ .no {
      color: ${({ theme }) => theme.primary.switchButton};
    }

    input:checked ~ .yes {
      color: ${({ theme }) => theme.gradient.lighterBlue};
    }

    input:not(:checked) ~ .yes {
      color: ${({ theme }) => theme.primary.switchButton};
    }

    input:not(:checked) ~ .no {
      color: ${({ theme }) => theme.gradient.lighterBlue};
    }
  }

  div.labelWpp {
    font-size: 14px;
    font-weight: 500;
    display: block;
  }
`;
