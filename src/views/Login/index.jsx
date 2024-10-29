import React, { useEffect, useState } from "react";
import Logo from "src/assets/logo-vetor.png";
import Container, { Form, Button } from "./styles";
import validationSchema from "./validationSchema";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "src/services/api";
import { useFormik } from "formik";
import Input from "src/components/Input";
import Title from "src/components/Title";
import Paragraph from "src/components/Paragraph/index";

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

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
      console.log("Login realizado com sucesso:", data);
      setLoginError(null);
    }
    if (error) {
      console.error("Login falhou:", error);
      setLoginError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Container>
      <header>
        <img src={Logo} alt="Logo do Jogo" />
      </header>
      <main>
        <Title title="Login" />
        <Paragraph
          content={
            "Colabore conosco. Digite abaixo seu usuário e senha para começar a cadastrar suas perguntas."
          }
        />
        <Form onSubmit={formik.handleSubmit}>
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
          <div>
            <Button type="submit">
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </div>
        </Form>

        {loginError && <p style={{ color: "red" }}>{loginError}</p>}

        <a href="/cadastro">Cadastre-se</a>
      </main>
      <footer>
        <p>Jogo da Bíblia &copy; 2022</p>
      </footer>
    </Container>
  );
}
