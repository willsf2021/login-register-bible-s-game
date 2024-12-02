import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router } from "react-router-dom";
import { colors } from "src/services/theme.js";
import GlobalStyle from "./styles";
import Routes from "src/services/Routes";
import SnackbarProvider from "react-simple-snackbar";

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
      <SnackbarProvider>
        <ThemeProvider theme={colors}>
          <GlobalStyle />
          <Router
            future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
          >
            <Routes />
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
