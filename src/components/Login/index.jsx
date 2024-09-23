import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../../assets/logo-vetor.png";
import "./styles.css";



export default function Login({handleLogin}) {

  return (
    <div className="loginPage">
      <div className="divHeader">
        <img src={Logo} alt="Logo do Jogo" />
      </div>
      <div className="divMain">
        <h1>Login</h1>
        <p>
          Colabore conosco. Digite abaixo seu usuário e senha para começar a
          cadastrar suas perguntas.
        </p>
        <LoginForm handleLogin = {handleLogin}/>
      </div>
      <div className="divFooter">
        <p>Jogo da Bíblia &copy; 2022</p>
      </div>
    </div>
  );
}
