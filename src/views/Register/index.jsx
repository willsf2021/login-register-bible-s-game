import React from "react";
import { useFormik } from "formik";
import validationSchema from "../Login/validationSchema";
import StyledInput from "../../components/Input/index";
import Logo from "../../assets/logo-vetor.png";
import {
  RegisterContainer,
  DivHeader,
  StyledLogo,
  DivMain,
  CheckboxContainer,
  ContainerTitlePara,
  CheckboxContainerWpp,
  StyledIsWhatsappLabel,
} from "./styles";
import { Form, Button } from "../Login/styles";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph/index";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation cadastrarUsuario($novoUsuario: UsuarioInput!) {
    cadastrarUsuario(novoUsuario: $novoUsuario) {
      usuario {
        email
        id
      }
    }
  }
`;

export default function RegisterForm() {
  const [cadastrarUsuario, { data, loading, error }] =
    useMutation(REGISTER_USER);

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
    onSubmit: (values) => {
      const requestData = {
        name: values.name,
        phone: values.phone,
        username: values.username,
        email: values.email,
        password: values.password,
        isWhatsapp: values.isWhatsapp,
      };

      cadastrarUsuario({
        variables: { novoUsuario: requestData },
      })
        .then((response) => {
          console.log("Usuário cadastrado com sucesso", response.data);
        })
        .catch((err) => {
          console.error("Erro ao cadastrar usuário", err);
          if (err.graphQLErrors) {
            err.graphQLErrors.forEach(({ message }) => {
              console.error("GraphQL Error:", message);
            });
          }
        });
    },
  });

  const handleWhatsappChange = () => {
    formik.setFieldValue("isWhatsapp", !formik.values.isWhatsapp);
  };

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
          <StyledIsWhatsappLabel>
            O número acima é WhatsApp?
          </StyledIsWhatsappLabel>
          <CheckboxContainerWpp>
            <span className="text yes">Não</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={formik.values.isWhatsapp}
                onChange={handleWhatsappChange}
              />
              <span className="slider"></span>
            </label>
            <span className="text no">Sim</span>
          </CheckboxContainerWpp>
          <CheckboxContainer>
            <StyledInput name="terms" type="checkbox" formik={formik} />
            <label htmlFor="terms">
              Li e concordo com os <a href="#">Termos de Uso</a>
            </label>
          </CheckboxContainer>
          <span>
            <Button type="submit" disabled={loading}>
              Cadastrar
            </Button>
          </span>
        </Form>
      </DivMain>
    </RegisterContainer>
  );
}
