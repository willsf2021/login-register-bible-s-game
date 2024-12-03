import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { isReference, useQuery } from "@apollo/client";
import { GET_TEMAS } from "src/services/api";
import Container, { ContainerLabelInput } from "./styles";
import { FormContainer } from "src/components/FormContainer";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import {
  fetchBooks,
  fetchChapters,
  fetchVerses,
  fetchCompleteReference,
} from "src/services/apiBiblia";

const AddQuestions = () => {
  const { loading, error, data } = useQuery(GET_TEMAS);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [bookId, setBookId] = useState("");

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      tipoResposta: "", // MANAGED
      referenciaBiblica: false,
      temaId: 0, // MANAGED
      referencia: "",
      enunciado: "", // MANAGED
      alternativas: {
        texto: "",
        correta: true,
      },
    },
    validationSchema: null,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    },
  });

  console.log(values);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    const { referencia } = values;
    if (referencia) {
      const regex = /^([A-Za-z0-9]+)\s+(\d+):(\d+)$/;
      const match = referencia.match(regex);
      if (match) {
        const abrev = match[1];
        const chapterNumber = match[2];
        const verseNumber = match[3];
        fetchCompleteReference(abrev, chapterNumber, verseNumber).then(
          (response) => {
            response.map((res) => {
              console.log(res.texto);
            });
          }
        );
      } else {
        return;
      }
    }
  }, [values.referencia]);

  useEffect(() => {
    if (values.tipoResposta || values.referenciaBiblica !== undefined) {
      setFieldValue("referencia", "");
      setChapters([]);
      setVerses([]);
    }
  }, [values.tipoResposta, values.referenciaBiblica]);

  const handleBook = (event) => {
    const currentBookId = event.target.value;

    if (currentBookId) {
      setChapters([]);
      setVerses([]);
      const selectedBook = books.find((book) => book.id == currentBookId).abrev;
      const newReference = `${selectedBook}`;
      setFieldValue("referencia", newReference);
      setBookId(currentBookId);

      fetchChapters(currentBookId).then((total) => {
        total = Number(total);
        const temp = [];
        for (let i = 1; i <= total; i++) {
          temp.push(i);
        }
        setChapters(temp);
      });
    } else {
      setFieldValue("referencia", "");
      setChapters([]);
      setVerses([]);
      return;
    }
  };

  const handleChapter = (event) => {
    const chapterNumber = event.target.value;

    if (chapterNumber) {
      setVerses([]);
      const { referencia } = values;
      const newReference = `${referencia.split(" ")[0]} ${chapterNumber}`;
      setFieldValue("referencia", newReference);

      fetchVerses(bookId, chapterNumber).then((total) => {
        total = Number(total);
        const temp = [];
        for (let i = 1; i <= total; i++) {
          temp.push(i);
        }
        setVerses(temp);
      });
    } else {
      setVerses([]);
      return;
    }
  };
  const handleVerse = (event) => {
    const verseNumber = event.target.value;

    if (verseNumber) {
      const { referencia } = values;
      const referenceParts = referencia.split(" ");
      const bookAbbreviation = referenceParts[0];
      const chapterAndVerse = referenceParts[1]?.split(":");
      const newReference = chapterAndVerse[1]
        ? `${bookAbbreviation} ${chapterAndVerse[0]}:${verseNumber}`
        : `${bookAbbreviation} ${
            chapterAndVerse ? chapterAndVerse[0] : 1
          }:${verseNumber}`;
      setFieldValue("referencia", newReference, false);
    } else {
      return;
    }
  };

  return (
    <Container>
      <Header />
      <main>
        {loading ? (
          <p>Carregando temas...</p>
        ) : error ? (
          <p>Erro ao carregar temas: {error.message}</p>
        ) : (
          <>
            <FormContainer onSubmit={handleSubmit}>
              <div className="titleParagraph">
                <Title title="Adicionar Pergunta" />
                <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas." />
              </div>
              <select
                name="temaId"
                id="temaId"
                value={values.temaId}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Selecione um tema</option>
                {data.temas.map((tema) => (
                  <option key={tema.id} value={tema.id}>
                    {tema.nome} {`ID - ${tema.id}`}
                  </option>
                ))}
              </select>
              <textarea
                name="enunciado"
                id="enunciado"
                placeholder="Pergunta"
                value={values.enunciado}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="containerTipoResposta">
                <Title title="Resposta" />
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="tipoResposta"
                    id="MES"
                    value="MES"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="MES" className="customRadio"></label>
                  <label htmlFor="MES">Múltipla Escolha</label>
                </ContainerLabelInput>
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="tipoResposta"
                    id="RCO"
                    value="RCO"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="RCO" className="customRadio"></label>
                  <label htmlFor="RCO">Referência Completa</label>
                </ContainerLabelInput>
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="tipoResposta"
                    id="RLC"
                    value="RLC"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="RLC" className="customRadio"></label>
                  <label htmlFor="RLC">Referência Livro-Capítulo</label>
                </ContainerLabelInput>
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="tipoResposta"
                    id="RES"
                    value="RES"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="RES" className="customRadio"></label>
                  <label htmlFor="RES">Resposta Simples</label>
                </ContainerLabelInput>
              </div>
              {values.tipoResposta === "MES" && <p>O TIPO É MES</p>}
              {values.tipoResposta === "RCO" && <p>O TIPO É RCO</p>}
              {values.tipoResposta === "RES" && <p>O TIPO É RES</p>}
              {values.tipoResposta === "RLC" && <p>O TIPO É RLC</p>}
              <div className="containerTipoReferencia">
                <Title title="Referência" />
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="referenciaBiblica"
                    id="refBib"
                    value={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="refBib" className="customRadio"></label>
                  <label htmlFor="refBib">Bíblica</label>
                </ContainerLabelInput>
                <ContainerLabelInput>
                  <input
                    type="radio"
                    name="referenciaBiblica"
                    id="refTex"
                    value={false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="refTex" className="customRadio"></label>
                  <label htmlFor="refTex">Textual (livros históricos)</label>
                </ContainerLabelInput>
              </div>
              {values.referenciaBiblica === "true" ? (
                <>
                  <select name="books" id="books" onChange={handleBook}>
                    <option value="">Selecione um livro...</option>
                    {books.map((book) => {
                      return (
                        <option key={book.id} value={book.id}>
                          {book.nome}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    disabled={
                      !values.referencia || !values.referencia.split(" ")[0]
                    }
                    name="chapters"
                    id="chapters"
                    onChange={handleChapter}
                  >
                    <option value="">Selecione um capítulo...</option>
                    {chapters.map((chapter) => {
                      return (
                        <option key={chapter} value={chapter}>
                          {chapter}
                        </option>
                      );
                    })}
                  </select>
                  {values.tipoResposta === "RLC" ? (
                    ""
                  ) : (
                    <select
                      disabled={
                        !values.referencia || !values.referencia.split(" ")[1]
                      }
                      name="verses"
                      id="verses"
                      onChange={handleVerse}
                    >
                      <option value="">Selecione um versículo...</option>
                      {verses.map((verse) => {
                        return (
                          <option key={verse} value={verse}>
                            {verse}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </>
              ) : (
                <div>
                  <textarea
                    name="referencia"
                    id="refTex"
                    placeholder="Textual"
                    value={values.referencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              )}
              <div className="containerButton">
                <Button type="submit">Enviar</Button>
              </div>
            </FormContainer>
          </>
        )}
      </main>
      <footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </footer>
    </Container>
  );
};

export default AddQuestions;
