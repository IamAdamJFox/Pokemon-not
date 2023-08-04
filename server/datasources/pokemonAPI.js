//this includes getPokemonsByIds, getMovesByPokemonId, getPokemonById, getAbilityByIdOrName, getMoveByIdOrName
const axios = require('axios');

class PokemonAPI {
  constructor() {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getPokemonsByIds(ids) {
    // Using Promise.all to fetch multiple Pokémon in parallel
    const pokemons = await Promise.all(ids.map(id => this.getPokemonById(id)));
    return pokemons;
  }

  async getMovesByPokemonId(pokemonId) {
    const pokemon = await this.getPokemonById(pokemonId);
    return pokemon.moves;
  }

  async getPokemonById(id) {
    const response = await axios.get(`${this.baseURL}pokemon/${id}`);
    const abilitiesPromises = response.data.abilities.map(ability => {
      return this.getAbilityByIdOrName(ability.ability.name);
    });
    const abilities = await Promise.all(abilitiesPromises);

    const moves = await Promise.all(
      response.data.moves.map(move => this.getMoveByIdOrName(move.move.name))
    );

    return {
      pokemonId: response.data.id,
      number: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      type: response.data.types.map(t => t.type.name),
      title: response.data.name,
      moves: moves.map(move => ({
        id: move.id,
        name: move.name,
      })),
      abilities: abilities.map(ability => ({
        id: ability.id,
        name: ability.name,
      })),
    };
  }

  async getAbilityByIdOrName(idOrName) {
    const response = await axios.get(`${this.baseURL}ability/${idOrName}`);
    return response.data;
  }

  async getMoveByIdOrName(idOrName) {
    const response = await axios.get(`${this.baseURL}move/${idOrName}`);
    return response.data;
  }
}

module.exports = PokemonAPI;
