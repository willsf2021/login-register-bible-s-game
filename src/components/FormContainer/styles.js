import styled from "styled-components";

export default styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 400px;
    row-gap: 32px;
    .containerButton {
      max-width: 400px;
    }
  }
`;
