import { Routes, Route } from "react-router-dom";
import Home from "src/views/Home";
import Login from "src/views/Login";
import Register from "src/views/Register";

export default () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
  </Routes>
)