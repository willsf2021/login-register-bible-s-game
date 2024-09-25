import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  InputsContainer,
  Input,
  Button,
  ErrorMessage,
} from "./styles";

export default function LoginForm({ handleLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("O nome de usuário é obrigatório"),
      password: Yup.string().required("A senha é obrigatória"),
    }),
    onSubmit: (values) => {
      console.log("Login realizado com sucesso:", values);
      handleLogin(values.username, values.password);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputsContainer>
        <Input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="username ou email"
          required
        />
        {formik.touched.username && formik.errors.username ? (
          <ErrorMessage>{formik.errors.username}</ErrorMessage>
        ) : null}
      </InputsContainer>

      <InputsContainer>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="senha"
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}
      </InputsContainer>
      <div>
        <Button type="submit">Entrar</Button>
      </div>
    </Form>
  );
}
