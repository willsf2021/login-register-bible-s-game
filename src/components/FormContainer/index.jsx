import Container from "./styles";

export const FormContainer = ({ children, onSubmit }) => {
  return <Container onSubmit={onSubmit}>{children}</Container>;
};
