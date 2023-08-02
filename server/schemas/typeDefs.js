const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    pokemonCount: Int
    savedPokemons: [Pokemon]
  }
  
  type Ability {
    id: ID!
    name: String!
  }

  type Move {
    id: ID!
    name: String!
  }

  type Pokemon {
    number: String
    name: String
    moves: [Move!]!
    abilities: [Ability!]!
    type: [String!]!
    pokemonId: ID!
    title: String!
    image: String
    link: String
  }

  input PokemonInput {
    number: String
    name: String
    type: String
    pokemonId: ID!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    getPokemonById(id: ID!): Pokemon
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(input: PokemonInput!): User
    removePokemon(Id: ID!): User
  }
`;

module.exports = typeDefs;