import React, { useEffect } from "react";
import Logo from "../../assets/logo-vetor.png";
import {
  LoginPage,
  DivHeader,
  DivMain,
  DivFooter,
  CadastroLink,
  Button,
  Form,
} from "./styles";
import validationSchema from "./validationSchema";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../services/api";
import { useFormik } from "formik";
import Input from "../../components/Input";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph/index";

export default function Login() {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION),
    formik = useFormik({
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
      console.log("Login realizado com sucesso:", data);
    }
    if (error) {
      console.error("Login falhou:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <LoginPage>
      <DivHeader>
        <img src={Logo} alt="Logo do Jogo" />
      </DivHeader>
      <DivMain>
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
        <CadastroLink href="">Cadastre-se</CadastroLink>
      </DivMain>
      <DivFooter>
        <p>Jogo da Bíblia &copy; 2022</p>
      </DivFooter>
    </LoginPage>
  );
}
