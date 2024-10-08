import React from "react";
import { useFormik } from "formik";
import validationSchema from "../../views/Login/validationSchema";
import StyledInput from "../../components/Input";
import Logo from "../../assets/logo-vetor.png";
import {
  RegisterContainer,
  DivHeader,
  StyledLogo,
  DivMain,
  CheckboxContainer,
  ContainerTitlePara,
} from "./styles";
import { Form, Button } from "../../views/Login/styles";
import Title from "../Title";
import Paragraph from "../Paragraph/index";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation cadastrarUsuario(
    $email: String!
    $password: String!
    $username: String!
    $isStaff: Boolean!
  ) {
    cadastrarUsuario(
      email: $email
      password: $password
      username: $username
      isStaff: $isStaff
    ) {
      usuario {
        email
        id
        isActive
        isStaff
        isSuperuser
        pontuacao
        username
      }
    }
  }
`;

export default function RegisterForm() {
  const [cadastrarUsuario, { data, loading, error }] =
    useMutation(REGISTER_USER);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      cadastrarUsuario({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
          isStaff: false,
        },
      })
        .then((response) => {
          console.log("Usuário cadastrado com sucesso", response.data);
        })
        .catch((err) => {
          console.error("Erro ao cadastrar usuário", err);
        });
    },
  });
  return (
    <RegisterContainer>
      <DivHeader>
        <StyledLogo src={Logo} />
      </DivHeader>
      <DivMain>
        <ContainerTitlePara>
          <Title title="Cadastre-se" />
          <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas" />
        </ContainerTitlePara>
        <Form onSubmit={formik.handleSubmit}>
          <StyledInput
            name="username"
            type="text"
            placeholder="username"
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
            name="password"
            type="password"
            placeholder="confirme a sua senha"
            formik={formik}
          />
          <StyledInput
            name="whatsapp"
            type="number"
            placeholder="whatsapp"
            formik={formik}
          />

          <CheckboxContainer>
            <StyledInput name="terms" type="checkbox" formik={formik} />
            <label htmlFor="terms">
              Li e concordo com os <a href="#">Termos de Uso</a>
            </label>
          </CheckboxContainer>
          <span>
            <Button type="submit">Cadastrar</Button>
          </span>
        </Form>
      </DivMain>
    </RegisterContainer>
  );
}
