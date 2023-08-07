import { gql } from '@apollo/client';

export const GET_POKEMONS_BY_IDS = gql`
  query getPokemonsByIds($ids: [ID!]!) {
    getPokemonsByIds(ids: $ids) {
      number
      name
      type
      image
      # ... other fields
    }
  }
`;
export const GET_POKEMON_BY_ID = gql`
  query getPokemonById($id: ID!) {
    getPokemonById(id: $id) {
      number
      name
      type
      image
      title
      # ... other fields
    }
  }
`;
export const GET_MOVES_BY_POKEMON_ID = gql`
  query getMovesByPokemonId($pokemonId: ID!) {
    getMovesByPokemonId(pokemonId: $pokemonId) {
      id
      name
      #... other fields related to the move
    }
  }
`;
export const SAVE_CURRENT_POKEMON = gql`
  mutation SaveCurrentPokemon($pokemonName: String!, $sprite: String!, $moves: [String!]!) {
    saveCurrentPokemon(pokemonName: $pokemonName, sprite: $sprite, moves: $moves) {
      name
      sprite
      moves
      
    }
  }
`;
// Define other queries below and export them similarly