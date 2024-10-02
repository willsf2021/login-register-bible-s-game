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

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      age: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulário enviado:", values);
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
          <span><Button type="submit">Cadastrar</Button></span>
        </Form>
      </DivMain>
    </RegisterContainer>
  );
}
