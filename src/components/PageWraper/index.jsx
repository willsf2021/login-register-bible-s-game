import { Header } from "src/components/Header";
import { Footer } from "src/components/Footer";
import Container from "./styles";

export const PageWraper = ({ children }) => {
  return (
    <Container>
      <Header />
      
      {children}
      <Footer />
    </Container>
  );
};
