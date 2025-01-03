import styled from "styled-components";

export default styled.div`
div.center {
    text-align: center;
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}
h2,p {
    padding-bottom: 16px;
}
  text-align: justify;
  max-width: 640px;
  padding: 80px;
  background-color: ${({ theme }) => theme.primary.white};
  ul li {
    list-style-position: inside;
  }
`;
