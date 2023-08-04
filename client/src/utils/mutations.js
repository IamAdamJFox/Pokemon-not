import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_POKEMON = gql`
  mutation createPokemon($name: String!, $type: String!) {
    createPokemon(name: $name, type: $type) {
      number
      name
      type
    }
  }
`;
export const ADD_SELECTED_MOVE = gql`
mutation AddSelectedMove($pokemonId: ID!, $moveName: String!) {
  addSelectedMove(pokemonId: $pokemonId, moveName: $moveName) {
    id
    moveName
  }
}
`;

// Define other mutations below and export them similarly
