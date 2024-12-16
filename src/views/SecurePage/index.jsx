import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SecurePage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, [navigate]);
  return <h1>Olá, {username}</h1>;
}

export default SecurePage;
