import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Container, { ContainerLabelInput } from "./styles";
import { FormContainer } from "src/components/FormContainer";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import { CustomSelect } from "src/components/CustomSelect";
import validationSchema from "./validationSchema";
import { GET_TEMAS } from "src/services/api";
import { REGISTER_QUESTION } from "src/services/api";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  fetchBooks,
  fetchChapters,
  fetchVerses,
  fetchCompleteReference,
} from "src/services/apiBiblia";
import { Alternative } from "../../components/Alternative";
import { Footer } from "../../components/Footer";
import { useFlash } from "../../contexts/FlashContext";

// Componente para os inputs de referência bíblica
const BibleReferenceInputs = ({
  books,
  bookId,
  chapters,
  verses,
  values,
  handleBook,
  handleChapter,
  handleVerse,
  showVerse = true,
  textReference,
  touched,
  errors,
}) => (
  <div className="selectBibleContainer">
    <CustomSelect
      options={books}
      selectedValue={
        books.find((b) => b.id == bookId)?.nome || "Selecione um livro"
      }
      onSelect={(book) => handleBook({ target: { value: book.id } })}
      placeholder="Selecione um livro"
    />
    <CustomSelect
      options={chapters.map((chapter) => ({ id: chapter, nome: `${chapter}` }))}
      selectedValue={
        values.referencia.split(" ")[1]?.split(":")[0] ||
        "Selecione um capítulo"
      }
      onSelect={(chapter) => handleChapter({ target: { value: chapter.id } })}
      placeholder="Selecione um capítulo"
    />
    {showVerse && (
      <CustomSelect
        options={verses.map((verse) => ({ id: verse, nome: `${verse}` }))}
        selectedValue={
          values.referencia.split(":")[1] || "Selecione um versículo"
        }
        onSelect={(verse) => handleVerse({ target: { value: verse.id } })}
        placeholder="Selecione um versículo"
      />
    )}
    {values.tipoResposta === "RCO" && textReference && (
      <Paragraph content={textReference} />
    )}
    {touched.referencia && errors.referencia && (
      <div className="error-message">{errors.referencia}</div>
    )}
  </div>
);

// Componente para alternativas de múltipla escolha
const AlternativesSection = ({
  alternativeContent,
  setAlternativeContent,
  values,
  addAlternative,
  deleteAlternative,
  toggleCorrect,
  touched,
  errors,
}) => (
  <div className="selectBibleContainer">
    <h2>Adicionar Alternativas</h2>
    <textarea
      placeholder="Descreva a alternativa e clique em adicionar, assinale a alternativa que deve ficar como correta."
      value={alternativeContent}
      onChange={(e) => setAlternativeContent(e.target.value)}
    />
    <Button
      type={"button"}
      handler={addAlternative}
      children="Adicionar Alternativa"
    />
    {values.alternativas.map((alternative, index) => (
      <Alternative
        key={index}
        id={index}
        content={alternative.texto}
        deleteAlternative={deleteAlternative}
        toggleCorrect={toggleCorrect}
        isChecked={alternative.correta}
      />
    ))}
    {touched.alternativas && errors.alternativas && (
      <div className="error-message">{errors.alternativas}</div>
    )}
  </div>
);

// Componente para seleção do tipo de resposta
const ResponseTypeSelector = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => (
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
    {touched.tipoResposta && errors.tipoResposta && (
      <div className="error-message">{errors.tipoResposta}</div>
    )}
  </div>
);

// Componente para seleção do tipo de referência
const ReferenceTypeSelector = ({
  disabled,
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => (
  <div className="containerTipoReferencia">
    <Title title="Referência" />
    <ContainerLabelInput>
      <input
        type="radio"
        name="referenciaBiblica"
        id="refBib"
        value="true"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
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
          value="false"
          onChange={handleChange}
          disabled={disabled}
          onBlur={handleBlur}
        />
        <label htmlFor="refTex" className="customRadio"></label>
        <label htmlFor="refTex">Textual (livros históricos)</label>
      </ContainerLabelInput>
      <p className="textual">
        Perguntas sobre a história da Igreja ou da Bíblia devem ter referência
        de onde foi extraído segundo o método de referência Vancouver
      </p>
    </div>
    {touched.referenciaBiblica && errors.referenciaBiblica && (
      <div className="error-message">{errors.referenciaBiblica}</div>
    )}
  </div>
);

const AddQuestions = () => {
  const { showFlash } = useFlash();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_TEMAS);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [bookId, setBookId] = useState("");
  const [alternativeContent, setAlternativeContent] = useState("");
  const [textReference, setTextReference] = useState("");

  const [cadastrarPergunta] = useMutation(REGISTER_QUESTION);

  const {
    handleChange: formikHandleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    validateField,
    setFieldValue,
    setFieldTouched,
    validateForm,
    isSubmitting,
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
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, actions) => {
      try {
        values.referenciaBiblica =
          values.referenciaBiblica === "true" ? true : false;
        const { data } = await cadastrarPergunta({
          variables: {
            novaPergunta: values,
          },
        });
        showFlash(
          "Pergunta cadastrada com sucesso! Redirecionando...",
          "success"
        );
        actions.resetForm();
        navigate("/"); // Lógica de redirecionamento
      } catch (err) {
        console.error("Erro ao cadastrar pergunta:", err);
        showFlash(`Erro ao cadastrar: ${err.message}`, "error");
      }
    },
  });
  const handleChange = (e) => {
    formikHandleChange(e);

    if (e.target.name === "tipoResposta") {
      handleResponseTypeChange(e.target.value);
    }

    if (e.target.name === "referenciaBiblica") {
      handleReferenceTypeChange(e.target.value);
    }
  };

  const resetReferenceFields = async () => {
    await setFieldValue("referencia", "");
    setBookId("");
    setChapters([]);
    setVerses([]);
    setTextReference("");
    setFieldTouched("referencia", false);
  };

  const handleResponseTypeChange = async (newType) => {
    if (newType === "RCO" || newType === "RLC") {
      await setFieldValue("referenciaBiblica", "true");
    }
    await resetReferenceFields();
    setTimeout(() => validateField("referencia"), 100);
  };

  const handleReferenceTypeChange = async (newRefType) => {
    await resetReferenceFields();
    setTimeout(() => validateField("referencia"), 100);
  };

  useEffect(() => {
    if (values.tipoResposta === "MES") {
      const timer = setTimeout(() => {
        validateField("alternativas");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [values.alternativas, values.tipoResposta]);

  useEffect(() => {
    const validate = async () => {
      await validateField("referencia");
    };

    if (values.tipoResposta || values.referenciaBiblica || values.referencia) {
      const timer = setTimeout(validate, 50);
      return () => clearTimeout(timer);
    }
  }, [values.tipoResposta, values.referenciaBiblica, values.referencia]);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    const { referencia } = values;
    if (referencia && values.referenciaBiblica === "true") {
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
      }
    }
  }, [values.referencia, values.referenciaBiblica]);

  const handleBook = (event) => {
    const currentBookId = event.target.value;
    setTextReference("");
    if (currentBookId) {
      setChapters([]);
      setVerses([]);
      const selectedBook = books.find((book) => book.id == currentBookId);
      if (selectedBook) {
        const newReference = `${selectedBook.abrev}`;
        setFieldValue("referencia", newReference);
        setFieldTouched("referencia", true);
        setBookId(currentBookId);

        fetchChapters(currentBookId).then((total) => {
          total = Number(total);
          const temp = [];
          for (let i = 1; i <= total; i++) {
            temp.push(i);
          }
          setChapters(temp);
        });
      }
    } else {
      setFieldValue("referencia", "");
      setChapters([]);
      setVerses([]);
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
      setFieldTouched("referencia", true);

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
      setFieldValue("referencia", newReference);
      setFieldTouched("referencia", true);
    }
  };

  const addAlternative = () => {
    if (alternativeContent.trim() === "") {
      return;
    }
    const newAlternative = { texto: alternativeContent, correta: false };
    setFieldValue("alternativas", [...values.alternativas, newAlternative]);
    setFieldTouched("alternativas", true);
    setAlternativeContent("");
  };

  const deleteAlternative = (index) => {
    setFieldValue(
      "alternativas",
      values.alternativas.filter((_, i) => i !== index)
    );
    setFieldTouched("alternativas", true);
  };

  const toggleCorrect = (index) => {
    setFieldValue(
      "alternativas",
      values.alternativas.map((alt, i) => ({
        ...alt,
        correta: i === index,
      }))
    );
    setFieldTouched("alternativas", true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = await validateForm();

    if (Object.keys(errors).length === 0) {
      handleSubmit(e);
    } else {
      Object.keys(errors).forEach((field) => {
        setFieldTouched(field, true);
      });
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
          <FormContainer onSubmit={handleFormSubmit}>
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
              onSelect={(option) => {
                setFieldValue("temaId", option.id);
                setFieldTouched("temaId", true);
              }}
              placeholder="Selecione um tema"
            />
            {touched.temaId && errors.temaId && (
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
            {touched.enunciado && errors.enunciado && (
              <div className="error-message">{errors.enunciado}</div>
            )}

            <ResponseTypeSelector
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
            />

            {(values.tipoResposta === "MES" ||
              values.tipoResposta === "RES") && (
              <>
                {values.tipoResposta === "MES" && (
                  <AlternativesSection
                    alternativeContent={alternativeContent}
                    setAlternativeContent={setAlternativeContent}
                    values={values}
                    addAlternative={addAlternative}
                    deleteAlternative={deleteAlternative}
                    toggleCorrect={toggleCorrect}
                    touched={touched}
                    errors={errors}
                  />
                )}

                <ReferenceTypeSelector
                  values={values}
                  disabled={["RCO", "RLC"].includes(values.tipoResposta)}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                />
              </>
            )}

            {values.referenciaBiblica === "true" ? (
              <BibleReferenceInputs
                books={books}
                bookId={bookId}
                chapters={chapters}
                verses={verses}
                values={values}
                handleBook={handleBook}
                handleChapter={handleChapter}
                handleVerse={handleVerse}
                showVerse={values.tipoResposta !== "RLC"}
                textReference={textReference}
                touched={touched}
                errors={errors}
              />
            ) : (
              <div>
                <textarea
                  name="referencia"
                  id="refTex"
                  placeholder="Digite a referência aqui (mínimo 10 caracteres)"
                  value={values.referencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.referencia && errors.referencia && (
                  <div className="error-message">{errors.referencia}</div>
                )}
              </div>
            )}

            <div className="containerButton">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </FormContainer>
        )}
      </main>
      <Footer>
        <p>Jogo da Bíblia &copy; {new Date().getFullYear()}</p>
      </Footer>
    </Container>
  );
};

export default AddQuestions;
