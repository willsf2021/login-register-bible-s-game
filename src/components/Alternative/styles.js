import styled from "styled-components";

export default styled.div`
  width: 100%;
  border: 1px solid #727376;
  border-radius: 5px;
  padding: 16px;
  color: #9e9d97;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  p {
    font-size: 16px;
    line-height: 24px;
  }
  label {
    font-size: 16px;
  }
  .bottomAlternative {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .trash {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  column-gap: 8px;
  input:checked + span {
    background-color: ${(props) => props.theme.gradient.lighterBlue};
    border-color: ${(props) => props.theme.gradient.lighterBlue};
  }

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark::after {
    content: "";
    position: absolute;
    display: none;
    left: 8px;
    top: 2px;
    width: 6px;
    height: 12px;
    border-bottom: 4px solid #fff;
    border-right: 4px solid #fff;
    border-radius: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  input:checked + .checkmark::after {
    display: block;
  }
`;
export const Label = styled.label`
  cursor: pointer;
`;
export const CheckMark = styled.span`
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 5px;
  transition: backgroud-color 0.3s;
  border: 1px solid #727376;
`;
