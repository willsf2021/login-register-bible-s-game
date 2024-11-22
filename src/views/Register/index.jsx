import React from "react";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import StyledInput from "src/components/Input/index";
import Logo from "src/assets/logo-vetor.png";
import Title from "src/components/Title";
import Paragraph from "src/components/Paragraph/index";
import Container from "./styles";
import { FormContainer } from "../../components/FormContainer";
import { Button } from "../../components/Button";
import { REGISTER_USER } from "src/services/api";
import { useMutation } from "@apollo/client";

export default function RegisterForm() {
  const [cadastrarUsuario, { loading }] = useMutation(REGISTER_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      isWhatsapp: false,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (
      { name, phone, username, email, password, isWhatsapp },
      { setFieldError }
    ) => {
      const requestData = {
        name,
        phone,
        username,
        email,
        password,
        isWhatsapp,
      };

      try {
        await cadastrarUsuario({
          variables: { novoUsuario: requestData },
        });
      } catch (err) {
        if (err.graphQLErrors) {
          err.graphQLErrors.forEach(({ message, extensions }) => {
            const field = extensions?.field || "general";
            setFieldError(field, message);
          });
        } else {
          setFieldError("general", "Erro ao cadastrar. Tente novamente.");
        }
      }
    },
  });

  return (
    <Container>
      <header>
        <img src={Logo} alt="Logo" />
      </header>
      <main>
        <FormContainer onSubmit={formik.handleSubmit}>
          <div className="titleParagraph">
            <Title title="Cadastre-se" />
            <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas" />
          </div>
          <StyledInput
            name="username"
            type="text"
            placeholder="username"
            formik={formik}
          />
          <StyledInput
            name="name"
            type="text"
            placeholder="nome"
            formik={formik}
          />
          <StyledInput
            name="email"
            type="email"
            placeholder="email"
            formik={formik}
          />
          <StyledInput
            name="password"
            type="password"
            placeholder="digite uma senha"
            formik={formik}
          />
          <StyledInput
            name="confirmPassword"
            type="password"
            placeholder="confirme a sua senha"
            formik={formik}
          />
          <StyledInput
            name="phone"
            type="text"
            placeholder="telefone (ex: +55 11 99999-9999)"
            formik={formik}
          />
          <div className="labelWpp">O número acima é WhatsApp?</div>
          <div className="containerWpp">
            <span className="text yes">Não</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={formik.values.isWhatsapp}
                onChange={() => {
                  formik.setFieldValue("isWhatsapp", !formik.values.isWhatsapp);
                }}
              />
              <span className="slider"></span>
            </label>
            <span className="text no">Sim</span>
          </div>
          <div className="checkbox">
            <StyledInput
              name="terms"
              type="checkbox"
              formik={formik}
              errortype="checkbox"
            />
            <label htmlFor="terms">
              Li e concordo com os <a href="#">Termos de Uso</a>
            </label>
          </div>
          {formik.errors.general && (
            <p style={{ color: "red" }}>{formik.errors.general}</p>
          )}
          <div className="containerButton">
            <Button type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Cadastrar"}
            </Button>
          </div>
        </FormContainer>
      </main>
      <footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </footer>
    </Container>
  );
}
