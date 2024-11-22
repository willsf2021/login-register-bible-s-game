import { useFormik } from "formik";
import { useQuery } from "@apollo/client";
import { GET_TEMAS } from "../../services/api";
import Container from "./styles";
import Header from "src/components/Header";
import Title from "src/components/Title";
import Paragraph from "src/components/Paragraph/index";
import { Footer } from "../../components/Footer";

const AddQuestions = () => {
  const { loading, error, data } = useQuery(GET_TEMAS);

  if (loading) return <p>Carregando temas...</p>;
  if (error) return <p>Erro ao carregar temas: {error.message}</p>;

  return (
    <div>
      <h1>Temas do Backend</h1>
      <ul>
        {data.temas.map((tema) => (
          <li key={tema.id}>{tema.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddQuestions;

// export default function AddQuestions() {
//   const addQuestionForm = () => {
//     const {handleChange,
//       handleBlur,
//       values,
//       errors,
//       touched,
//       isSubmitting,
//       handleSubmit} = useFormik({
//       initialValues: {

//       }
//     })
//   }

//   return (
//     <Container>
//       <Header />
//       <main>
//         <div className="titleParagraph">
//           <Title title="Adicionar Pergunta" />
//           <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas." />
//         </div>
//       </main>
//       <footer>
//         <p>Jogo da Bíblia &copy; 2022</p>
//       </footer>
//     </Container>
//   );
// }
