import { Routes, Route } from "react-router-dom";
import Home from "src/views/Home";
import Login from "src/views/Login";
import Register from "src/views/Register";
import AddQuestions from "src/views/AddQuestions";
import SecuredPage from "../views/SecuredPage";
import TermsAndPolicy from "../views/TermsAndPolicy";

export default () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/adicionar-perguntas" element={<AddQuestions />} />
    <Route path="/pagina-segura" element={<SecuredPage />} />
    <Route path="/termos-e-politicas" element={<TermsAndPolicy />} />
  </Routes>
);
