import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_ID } from '../utils/queries';

function PokemonDetails({ match }) {
  const pokemonId = match.params.id;
  const { loading, error, data } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.pokemon.name}</h2>
      {/* Render other details here */}
    </div>
  );
}

export default PokemonDetails;