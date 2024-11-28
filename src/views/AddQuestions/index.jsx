import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { isReference, useQuery } from "@apollo/client";
import { GET_TEMAS } from "src/services/api";
import Container, { ContainerLabelInput } from "./styles";
import { FormContainer } from "src/components/FormContainer";
import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index"
import { BibleRef } from "../../components/BibleRef";

const AddQuestions = () => {
  const { loading, error, data } = useQuery(GET_TEMAS);

  const [isReferenceComplete, setIsReferenceComplete] = useState("");

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
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

  // console.log(values);

  useEffect(() => {
    setIsReferenceComplete(values.tipoResposta == "RLC" ? "RLC" : "");
  }, [values.tipoResposta]);

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
                <BibleRef isReferenceComplete={isReferenceComplete} />
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
