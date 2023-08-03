import { gql } from '@apollo/client';

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
