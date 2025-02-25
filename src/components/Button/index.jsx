import { Children } from "react";
import Container from "./styles";

export const Button = ({ type, children, disable, handler }) => {
  return (
    <Container onClick={handler} type={type} disabled={disable}>
      {children}
    </Container>
  );
};
