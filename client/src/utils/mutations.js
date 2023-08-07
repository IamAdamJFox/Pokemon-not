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
  mutation createPokemon($name: String!, $type: [String!]!) {
    createPokemon(name: $name, type: $type) {
      number
      name
      type

        username
        email
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
        number
        title
        image
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
export const ADD_SELECTED_MOVE = gql`
  mutation addSelectedMove($pokemonId: ID!, $moveName: String!) {
    addSelectedMove(pokemonId: $pokemonId, moveName: $moveName) {
      _id
      name
      image
    }
  }
`;

export const SAVE_CURRENT_POKEMON = gql`
  mutation SaveCurrentPokemon($pokemonName: String!, $sprite: String!, $moves: [String!]!) {
    saveCurrentPokemon(pokemonName: $pokemonName, sprite: $sprite, moves: $moves) {
      Name
      sprite
      moves
      # Add any other fields you want to return after saving
    }
  }
`;