import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../../assets/logo-vetor.png";
import {
  LoginPage,
  DivHeader,
  DivMain,
  DivFooter,
  CadastroLink,
} from "./styles";

export default function Login({ handleLogin }) {
  return (
    <LoginPage>
      <DivHeader>
        <img src={Logo} alt="Logo do Jogo" />
      </DivHeader>
      <DivMain>
        <h1>Login</h1>
        <p>
          Colabore conosco. Digite abaixo seu usuário e senha para começar a
          cadastrar suas perguntas.
        </p>
        <LoginForm handleLogin={handleLogin} />
        <CadastroLink href="">Cadastre-se</CadastroLink>
      </DivMain>
      <DivFooter>
        <p>Jogo da Bíblia &copy; 2022</p>
      </DivFooter>
    </LoginPage>
  );
}