import styled from "styled-components";

export default styled.div`
  width: 100%;
  border: 1px solid #727376;
  border-radius: 5px;
  padding: 16px;
  p {
    font-size: 20px;
  }
  label {
    font-size: 20px;
  }

  .trash {
    width: 20px;
    height: 20px;
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

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
    top: 1px;
    width: 8px;
    height: 16px;
    border-bottom: 4px solid #fff;
    border-right: 4px solid #fff;
    border-radius: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  input:checked + .checkmark::after {
    display: block;
  }
`;
export const Label = styled.label``;
export const CheckMark = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: white;
  border-radius: 5px;
  transition: backgroud-color 0.3s;
  border: 1px solid #727376;
`;
