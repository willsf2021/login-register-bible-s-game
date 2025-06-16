import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "src/assets/logo-vetor.png";
import validationSchema from "./validationSchema";
import Container from "./styles";
import { FormContainer } from "../../components/FormContainer";
import { Button } from "../../components/Button";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "src/services/api";
import { useFormik } from "formik";
import { Input } from "src/components/Input";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import { Footer } from "../../components/Footer";
import { useFlash } from "../../contexts/FlashContext";

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const { showFlash } = useFlash();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Solicitando login...", values);
      login({
        variables: {
          username: values.username,
          password: values.password,
        },
      }).catch((error) => {
        console.error("Erro na mutation:", error);
        setLoginError(error.message);
      });
    },
  });

  useEffect(() => {
    if (data) {
      const token = data.login.token;
      localStorage.setItem("authToken", token);
      setLoginError(null);

      showFlash("Login realizado com sucesso! Redirecionando...", "success");
      // Lógica de redirecionamento
    }

    if (error) {
      console.error("Login falhou:", error);
      setLoginError(error.message);

      showFlash(error.message, "error");
    }
  }, [data, error, navigate, showFlash]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Container>
      <header>
        <img src={Logo} alt="Logo do Jogo" />
      </header>
      <main>
        <FormContainer
          onSubmit={(event) => {
            event.preventDefault();
            formik.handleSubmit(event);
          }}
        >
          <Title title="Login" />
          <Paragraph
            content={
              "Colabore conosco. Digite abaixo seu usuário e senha para começar a cadastrar suas perguntas."
            }
          />
          <Input
            name="username"
            placeholder="username ou email"
            formik={formik}
          />
          <Input
            name="password"
            type="password"
            placeholder="senha"
            formik={formik}
          />
          <div className="containerButton">
            <Button type="submit">
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </div>
          <a href="/cadastro">Cadastre-se</a>
        </FormContainer>
      </main>
      <Footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </Footer>
    </Container>
  );
}
