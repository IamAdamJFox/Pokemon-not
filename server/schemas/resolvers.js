//includes getPokemonsByIds, getMovesByPokemonId, getPokemonById, getAbilityByIdOrName, getMoveByIdOrName
const { User, Pokemon } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  // Define the me resolver to get the current user's data
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedPokemons');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    getPokemonsByIds: async (_, { ids }, { dataSources }) => {
      const pokemons = [];
      for (const id of ids) {
        const pokemon = await dataSources.pokemonAPI.getPokemonById(id);
        pokemons.push(pokemon);
      }
      return pokemons;
    },
    getPokemonById: async (_, { id }, { dataSources }) => {
      return dataSources.pokemonAPI.getPokemonById(id);
    },
    getMovesByPokemonId: async (_, { pokemonId }, { dataSources }) => { // Add this resolver
      return dataSources.pokemonAPI.getMovesByPokemonId(pokemonId);
    },
  },

  Mutation: {
    // Define the login resolver to handle user login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },


    // Define the addUser resolver to handle user signup
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Define the savePokemon resolver to save a Pokemon to the user's account
    savePokemon: async (parent, { input }, context) => {
      if (context.user) {
        const updatedPokemons = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPokemons: input } },
          { new: true }
        ).populate('savedPokemons');

        return updatedPokemons;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // Define the removePokemon resolver to remove a Pokemon from the user's account
    removePokemon: async (parent, { Id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPokemons: { PokemonId: Id } } },
          { new: true }
        ).populate('savedPokemons');

        if (!updatedUser) {
          throw new AuthenticationError(`Couldn't find user with this id: ${context.user._id}`);
        }

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;