import styled from "styled-components";
import { colors } from "src/services/theme";

export default styled.div`
  height: 100%;
  max-width: 700px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 56px 24px 24px;
    max-height: 100%;
    flex: 1;
    div.titleParagraph {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      margin-bottom: 24px;
      @media (min-width: 768px) {
        margin-bottom: 0px;
      }
    }

    textarea,
    input,
    select {
      width: 100%;
    }
  }
  footer {
    text-align: center;
    padding-bottom: 24px;
    p {
      font-size: 12px;
    }
  }
`;
