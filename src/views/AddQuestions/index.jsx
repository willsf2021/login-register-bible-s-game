import { useFormik } from "formik";
import { useQuery } from "@apollo/client";
import { GET_TEMAS } from "../../services/api";
import Container from "./styles";
import Header from "src/components/Header";
import Title from "src/components/Title";
import Paragraph from "src/components/Paragraph/index";

const AddQuestions = () => {
  const { loading, error, data } = useQuery(GET_TEMAS);

  if (loading) return <p>Carregando temas...</p>;
  if (error) return <p>Erro ao carregar temas: {error.message}</p>;

  const addQuestionForm = () => {
    const {
      handleChange,
      handleBlur,
      values,
      errors,
      touched,
      isSubmitting,
      handleSubmit,
    } = useFormik({
      initialValues: {},
    });
  };

  return (
    <Container>
      <Header />
      <main>
        <div className="titleParagraph">
          <Title title="Adicionar Pergunta" />
          <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas." />
        </div>
        <form>
          <select name="" id="">
            {data.temas.map((tema) => {
              return (
                <option key={tema.id} value={tema.nome}>
                  {tema.nome}{` ID - ${tema.id}`}
                </option>
              );
            })}
          </select>
          <textarea name="" id="" placeholder="Pergunta"></textarea>
        </form>
      </main>
      <footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </footer>
    </Container>
  );
};
export default AddQuestions;
