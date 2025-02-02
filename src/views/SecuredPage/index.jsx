import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageWraper } from "src/components/PageWraper";
import { MainWraper } from "src/components/MainWraper";

function SecuredPage() {
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
  return (
    <PageWraper>
      <MainWraper>
        <h1>Olá, {username}</h1>
      </MainWraper>
    </PageWraper>
  );
}

export default SecuredPage;
