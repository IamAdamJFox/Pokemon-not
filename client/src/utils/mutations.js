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

// Define other mutations below and export them similarly
