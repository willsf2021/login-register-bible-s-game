import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation cadastrarUsuario($novoUsuario: UsuarioInput!) {
    cadastrarUsuario(novoUsuario: $novoUsuario) {
      usuario {
        email
        id
      }
    }
  }
`;


export const REGISTER_QUESTION = gql`
  mutation cadastrarPergunta($novaPergunta: PerguntaInput!) {
    cadastrarPergunta(novaPergunta: $novaPergunta) {
      pergunta {
        id
      }
    }
  }
`;

export const GET_TEMAS = gql`
  query GetTemas {
    temas {
      cor
      id
      nome
    }
  }
`;