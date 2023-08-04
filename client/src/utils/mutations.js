import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
export const SAVE_POKEMON = gql`
  mutation savePokemon($input: PokemonInput!) {
    savePokemon(input: $input) {
      _id
      username
      email
      savedPokemons {
        pokemonId
        name
        type
      }
    }
  }
`;
export const REMOVE_POKEMON = gql`
  mutation removePokemon($Id: ID!) {
    removePokemon(Id: $Id) {
      _id
      username
      email
      savedPokemons {
        pokemonId
        name
        type
      }
    }
  }
`;
// Define other mutations below and export them similarly