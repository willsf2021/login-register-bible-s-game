import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "src/services/Routes";
import GlobalStyle from "./styles";

const httpLink = createHttpLink({
  uri: "https://jogodabiblia.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
