import styled from "styled-components";

export default styled.div`
  min-height: 100vh;
  max-width: 700px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.primary.white};
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;
