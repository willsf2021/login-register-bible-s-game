import { BrowserRouter as Router } from "react-router-dom";
import Routes from "src/services/Routes";
import GlobalStyle from "./styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://jogodabiblia.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
}
