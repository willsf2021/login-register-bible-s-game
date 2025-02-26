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
import { CustomSelect } from "src/components/CustomSelect";
import validationSchema from "./validationSchema";
import {
  fetchBooks,
  fetchChapters,
  fetchVerses,
  fetchCompleteReference,
} from "src/services/apiBiblia";
import { Alternative } from "../../components/Alternative";
import { Footer } from "../../components/Footer";

const AddQuestions = () => {
  const { loading, error, data } = useQuery(GET_TEMAS);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [bookId, setBookId] = useState("");
  const [alternativeContent, setAlternativeContent] = useState("");

  const [textReference, setTextReference] = useState("");
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
      tipoResposta: "MES",
      referenciaBiblica: "true",
      temaId: 0,
      referencia: "",
      enunciado: "",
      alternativas: [],
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    },
  });

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
              setTextReference(res.texto);
            });
          }
        );
      } else {
        return;
      }
    }
  }, [values.referencia]);

  console.log(values);

  useEffect(() => {
    if ((values.tipoResposta || values.referenciaBiblica) !== undefined) {
      if (values.tipoResposta === "RCO" || values.tipoResposta === "RLC") {
        setFieldValue("referenciaBiblica", "true");
      }
      setFieldValue("referencia", "");
      setBookId([]);
      setChapters([]);
      setVerses([]);
      setTextReference("");
    }
    console.log(values);
  }, [values.tipoResposta, values.referenciaBiblica]);

  const handleBook = (event) => {
    const currentBookId = event.target.value;
    setTextReference("");
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
    setTextReference("");
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

  const addAlternative = () => {
    const newAlternative = { texto: alternativeContent, correta: false };
    setFieldValue("alternativas", [...values.alternativas, newAlternative]);
    setAlternativeContent("");
  };

  const deleteAlternative = (index) => {
    setFieldValue(
      "alternativas",
      values.alternativas.filter((_, i) => i !== index)
    );
  };

  const toggleCorrect = (index) => {
    setFieldValue(
      "alternativas",
      values.alternativas.map((alt, i) => ({
        ...alt,
        correta: i === index,
      }))
    );
  };
  useEffect(() => {
    console.log(alternativeContent);
  }, [alternativeContent]);

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

              <CustomSelect
                options={data.temas}
                selectedValue={
                  data.temas.find((t) => t.id == values.temaId)?.nome ||
                  "Selecione um tema"
                }
                onSelect={(option) => setFieldValue("temaId", option.id)}
                placeholder="Selecione um tema"
              />
              {errors.temaId && (
                <div className="error-message">{errors.temaId}</div>
              )}
              <textarea
                name="enunciado"
                id="enunciado"
                placeholder="Pergunta"
                value={values.enunciado}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.enunciado && (
                <div className="error-message">{errors.enunciado}</div>
              )}
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
                    checked={values.tipoResposta === "MES"}
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
              {(values.tipoResposta === "MES" ||
                values.tipoResposta === "RES") && (
                <>
                  {values.tipoResposta === "MES" && (
                    <div className="selectBibleContainer">
                      <h2>Adicionar Alternativas</h2>
                      <textarea
                        placeholder="Descreva a alternativa e clique em adicionar, assinale a alternativa que deve ficar como correta."
                        value={alternativeContent}
                        onChange={(e) => {
                          setAlternativeContent(e.target.value);
                        }}
                      ></textarea>
                      <Button
                        type={"button"}
                        handler={addAlternative}
                        children="Adicionar Alternativa"
                      />
                      {values.alternativas.map((alternative, index) => {
                        return (
                          <Alternative
                            key={index}
                            id={index}
                            content={alternative.texto}
                            deleteAlternative={deleteAlternative}
                            toggleCorrect={toggleCorrect}
                            isChecked={alternative.correta}
                          />
                        );
                      })}
                    </div>
                  )}
                  
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
                        checked={values.referenciaBiblica === "true"}
                      />
                      <label htmlFor="refBib" className="customRadio"></label>
                      <label htmlFor="refBib">Bíblica</label>
                    </ContainerLabelInput>
                    <div>
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
                        <label htmlFor="refTex">
                          Textual (livros históricos)
                        </label>
                      </ContainerLabelInput>
                      <p className="textual">
                        Perguntas sobre a história da Igreja ou da Bíblia devem
                        ter referência de onde foi extraído segundo o método de
                        referência Vancouver
                      </p>
                    </div>
                  </div>
                </>
              )}
              {values.referenciaBiblica === "true" ? (
                <div className="selectBibleContainer">
                  <CustomSelect
                    options={books}
                    selectedValue={
                      books.find((b) => b.id == bookId)?.nome ||
                      "Selecione um livro"
                    }
                    onSelect={(book) =>
                      handleBook({ target: { value: book.id } })
                    }
                    placeholder="Selecione um livro"
                  />
                  <CustomSelect
                    options={chapters.map((chapter) => ({
                      id: chapter,
                      nome: `${chapter}`,
                    }))}
                    selectedValue={
                      values.referencia.split(" ")[1]?.split(":")[0] ||
                      "Selecione um capítulo"
                    }
                    onSelect={(chapter) =>
                      handleChapter({ target: { value: chapter.id } })
                    }
                    placeholder="Selecione um capítulo"
                  />
                  {values.tipoResposta !== "RLC" && (
                    <CustomSelect
                      options={verses.map((verse) => ({
                        id: verse,
                        nome: `${verse}`,
                      }))}
                      selectedValue={
                        values.referencia.split(":")[1] ||
                        "Selecione um versículo"
                      }
                      onSelect={(verse) =>
                        handleVerse({ target: { value: verse.id } })
                      }
                      placeholder="Selecione um versículo"
                    />
                  )}
                  {values.tipoResposta === "RCO" && textReference ? (
                    <Paragraph content={textReference} />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div>
                  <textarea
                    name="referencia"
                    id="refTex"
                    placeholder="Digite a referência aqui"
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
      <Footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </Footer>
    </Container>
  );
};

export default AddQuestions;
