import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router } from "react-router-dom";
import FlashMessage from "src/components/FlashMessage";
import Routes from "src/services/Routes";
import GlobalStyle from "./styles";
import { colors } from "src/services/theme.js";
import { FlashProvider } from "src/contexts/FlashContext";

const httpLink = createHttpLink({
  uri: "https://jogodabiblia.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
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
      <FlashProvider>
        <ThemeProvider theme={colors}>
          <FlashMessage />
          <GlobalStyle />
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      </FlashProvider>
    </ApolloProvider>
  );
}
