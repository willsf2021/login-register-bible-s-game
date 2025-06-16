import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import { Input } from "src/components/Input/index";
import Logo from "src/assets/logo-vetor.png";
import Container from "./styles";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import { FormContainer } from "../../components/FormContainer";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { REGISTER_USER } from "src/services/api";
import { useMutation } from "@apollo/client";


export default function RegisterForm() {
  const [cadastrarUsuario, { loading }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();

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
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {

        const { confirmPassword, terms, ...usuarioInput } = values;

        const { data } = await cadastrarUsuario({
          variables: {
            novoUsuario: usuarioInput,
          },
        });
        if (data?.cadastrarUsuario) {
          navigate("/login");
          resetForm();
        }
      } catch (error) {
        const graphQLErrors = error.graphQLErrors || [];

        graphQLErrors.forEach((err) => {
          if (err.extensions.code === "EMAIL_JA_CADASTRADO") {
            setFieldError("email", "Este e-mail já está cadastrado");
          }
          if (err.extensions.code === "LOGIN_INDISPONIVEL") {
            setFieldError(
              "username",
              "Este nome de usuário não está disponível"
            );
          }
        });
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
          <Input
            name="username"
            type="text"
            placeholder="username"
            formik={formik}
          />
          <Input name="name" type="text" placeholder="nome" formik={formik} />
          <Input
            name="email"
            type="email"
            placeholder="email"
            formik={formik}
          />
          <Input
            name="password"
            type="password"
            placeholder="digite uma senha"
            formik={formik}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="confirme a sua senha"
            formik={formik}
          />
          <Input
            name="phone"
            type="text"
            placeholder="11 98887-8886"
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
            <Input
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
      <Footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </Footer>
    </Container>
  );
}
