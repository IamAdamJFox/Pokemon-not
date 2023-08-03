import { gql } from '@apollo/client';

export const GET_POKEMON_BY_ID = gql`
  query getPokemonById($id: ID!) {
    getPokemonById(id: $id) {
      number
      name
      type
      # ... other fields
    }
  }
`;

// Define other queries below and export them similarly