import { useEffect } from "react";
import validationSchema from "./validationSchema";
import Logo from "src/assets/logo-vetor.png";
import Container from "./styles";
import { Input } from "src/components/Input/index";
import { useFormik } from "formik";
import { Title } from "src/components/Title";
import { Paragraph } from "src/components/Paragraph/index";
import { StyledForm } from "src/components/StyledForm";
import { Button } from "src/components/Button";
import { Footer } from "src/components/Footer";
import { REGISTER_USER, LOGIN_MUTATION } from "src/services/api";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PageWraper } from "src/components/PageWraper";
import { MainWraper } from "src/components/MainWraper";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [cadastrarUsuario, { data, loading, error }] =
    useMutation(REGISTER_USER);
  const [login, { data: loginData, error: loginError }] =
    useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data?.cadastrarUsuario?.usuario) {
      toast.success("Cadastro realizado com sucesso!");
      const { username, password } = formik.values;
      setTimeout(
        () =>
          login({
            variables: { username, password },
          }),
        2000
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (loginData?.login?.token) {
      localStorage.setItem("authToken", loginData.login.token);
      localStorage.setItem("username", formik.values.name);
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/pagina-segura");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors?.length > 0) {
        error.graphQLErrors.forEach(({ message }) => {
          toast.error(message);
        });
      } else {
        toast.error("Erro ao realizar o cadastro. Tente novamente.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
      await cadastrarUsuario({
        variables: {
          novoUsuario: {
            name: values.name,
            phone: values.phone,
            isWhatsapp: values.isWhatsapp,
            email: values.email,
            username: values.username,
            password: values.password,
          },
        },
      });
    },
  });

  return (
    <PageWraper>
      <Container>
        <MainWraper>
          <StyledForm onSubmit={formik.handleSubmit}>
            <div className="titleParagraph">
              <Title title="Cadastre-se" />
              <Paragraph content="Para começar a colaborar cadastre-se com seus dados abaixo e comece a enviar perguntas" />
            </div>
            <Input
              name="username"
              type="text"
              placeholder="username"
              formik={formik}
            />
            <Input name="name" type="text" placeholder="nome" formik={formik} />
            <Input
              name="email"
              type="email"
              placeholder="email"
              formik={formik}
            />
            <Input
              name="password"
              type="password"
              placeholder="digite uma senha"
              formik={formik}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirme a sua senha"
              formik={formik}
            />
            <Input
              name="phone"
              type="text"
              placeholder="11 98887-8886"
              formik={formik}
            />
            <div className="labelWpp">O número acima é WhatsApp?</div>
            <div className="containerWpp">
              <span className="text yes">Não</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formik.values.isWhatsapp}
                  onChange={() => {
                    formik.setFieldValue(
                      "isWhatsapp",
                      !formik.values.isWhatsapp
                    );
                  }}
                />
                <span className="slider"></span>
              </label>
              <span className="text no">Sim</span>
            </div>
            <div className="checkbox">
              <Input
                name="terms"
                type="checkbox"
                formik={formik}
                errortype="checkbox"
              />
              <label htmlFor="terms">
                Li e concordo com os{" "}
                <a href="/termos-e-politicas?tab=termos-de-uso">
                  Termos de Uso{" "}
                </a>
                e
                <a href="/termos-e-politicas?tab=politica-de-privacidade">
                  {" "}
                  Políticas de Privacidade
                </a>
              </label>
            </div>
            {formik.errors.general && (
              <p style={{ color: "red" }}>{formik.errors.general}</p>
            )}
            <div className="containerButton">
              <Button type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Cadastrar"}
              </Button>
            </div>
          </StyledForm>
        </MainWraper>
        <ToastContainer />
      </Container>
    </PageWraper>
  );
}
