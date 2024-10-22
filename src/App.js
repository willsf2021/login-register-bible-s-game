import React from "react";
import Login from "./views/Login/index";
import Register from "./views/Register/index";
import GlobalStyle from "./styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://jogodabiblia.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GlobalStyle />
        <Register />
        {/* <Login /> */}
      </div>
    </ApolloProvider>
  );
}
