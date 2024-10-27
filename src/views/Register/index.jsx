import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
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
  const [cadastrarUsuario, { loading }] = useMutation(REGISTER_USER);
  const [errorMessage, setErrorMessage] = useState(null); // Estado para mensagem de erro

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
    onSubmit: async (values) => {
      const requestData = {
        name: values.name,
        phone: values.phone,
        username: values.username,
        email: values.email,
        password: values.password,
        isWhatsapp: values.isWhatsapp,
      };

      try {
        await cadastrarUsuario({
          variables: { novoUsuario: requestData },
        });
        setErrorMessage(null);
      } catch (err) {
        if (err.graphQLErrors) {
          err.graphQLErrors.forEach(({ message }) => {
            if (message.includes("email")) {
              setErrorMessage(
                "Esse email já está em uso. Por favor, use outro."
              );
            } else if (message.includes("username")) {
              setErrorMessage(
                "Esse nome de usuário já está em uso. Por favor, escolha outro."
              );
            } else {
              setErrorMessage("Erro ao cadastrar. Tente novamente.");
            }
          });
        } else {
          setErrorMessage("Erro ao cadastrar. Tente novamente.");
        }
      }
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
            <StyledInput
              name="terms"
              type="checkbox"
              formik={formik}
              errortype="checkbox"
            />
            <label htmlFor="terms">
              Li e concordo com os <a href="#">Termos de Uso</a>
            </label>
          </CheckboxContainer>
          <span>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Button type="submit" disabled={loading}>
              Cadastrar
            </Button>
          </span>
        </Form>
      </DivMain>
    </RegisterContainer>
  );
}
