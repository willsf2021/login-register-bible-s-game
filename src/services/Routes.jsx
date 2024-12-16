import { Routes, Route } from "react-router-dom";
import Home from "src/views/Home";
import Login from "src/views/Login";
import Register from "src/views/Register";
import AddQuestions from "src/views/AddQuestions";
import SecurePage from "../views/SecurePage";

export default () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/adicionar-perguntas" element={<AddQuestions />} />
    <Route path="/pagina-segura" element={<SecurePage />} />
  </Routes>
);
