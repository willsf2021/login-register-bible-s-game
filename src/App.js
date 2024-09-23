import React from "react";
import Login from "./components/Login/index";
import { useMutation, gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default function App() {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (username, password) => {
    try {
      const response = await login({
        variables: {
          username,
          password,
        },
      });
      console.log("Login successful, token:", response.data.login.token);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="App">
      <Login handleLogin={handleLogin} />
    </div>
  );
}
