import Container from "./styles";

export const StyledForm = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};
