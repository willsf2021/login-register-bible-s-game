import { Children } from "react";
import Container from "./styles";

export const Button = ({ type, children, disable }) => {
  return (
    <Container type={type} disabled={disable}>
      {children}
    </Container>
  );
};
