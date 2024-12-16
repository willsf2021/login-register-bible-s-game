import React, { useEffect, useState } from "react";
import Logo from "src/assets/logo-vetor.png";
import validationSchema from "./validationSchema";
import Container from "./styles";
import { StyledForm } from "src/components/StyledForm";
import { Button } from "src/components/Button";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "src/services/api";
import { useFormik } from "formik";
import { Input } from "src/components/Input";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import { Footer } from "src/components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loginError, setLoginError] = useState(null);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
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
      });
    },
  });

  useEffect(() => {
    if (data) {
      const token = data.login.token;
      console.log("Login realizado com sucesso:", data);
      localStorage.setItem("authToken", token);
      setLoginError(null);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/pagina-segura");
      }, 2000);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Login falhou:", error);
      setLoginError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Container>
      <header>
        <img src={Logo} alt="Logo do Jogo" />
      </header>
      <main>
        <StyledForm
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
        </StyledForm>

        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </main>
      <Footer />
      <ToastContainer />
    </Container>
  );
}
