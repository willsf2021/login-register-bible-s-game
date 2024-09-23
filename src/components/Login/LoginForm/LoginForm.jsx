import React from "react";
import "./styles.css";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    <form onSubmit={formik.handleSubmit}>
      <div className="inputsContainer">
        <input
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
          <div className="error">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="inputsContainer">
        <input
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
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="divButton">
        <button type="submit">Entrar</button>
      </div>
    </form>
  );
}
