import styled from "styled-components";

export default styled.div`
  width: 100%;
  position: relative;
  .selectBtn {
    display: flex;
    height: 56px;
    padding: 0px 16px;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #727376;
    width: 100%;
  }

  ul {
    z-index: 999;
    border: 1px solid #727376;
    width: 100%;
    position: absolute;
    padding: 8px;
    border-radius: 5px;
    margin-top: 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    opacity: ${({ $isopen }) => ($isopen ? 1 : 0)};
    transform: ${({ $isopen }) =>
      $isopen ? "translateY(0)" : "translateY(-10px)"};
    transition: opacity 0.3s ease, transform 0.3s ease;
    /* pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")}; */
    li {
      height: 32px;
      width: 100%;
      cursor: pointer;
      padding: 0 16px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
    li:hover {
      background-color: #f2f2f2;
    }
  }
`;
