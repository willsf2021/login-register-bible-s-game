import Container from "./styles";
import Header from "src/components/Header";
import Title from "src/components/Title";
import Paragraph from "src/components/Paragraph/index";

export default function AddQuestions() {
  return (
    <Container>
      <Header />
      <main>
        <div className="titleParagraph">
          <Title title="Adicionar Pergunta" />
          <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas." />
        </div>
      </main>
      <footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </footer>
    </Container>
  );
}
