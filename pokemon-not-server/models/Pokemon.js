const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const pokemonSchema = new Schema({
  number: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
    required: true,
  },
  pokemonId: {
   type: String,
   required: true,
  }

  
});

module.exports = pokemonSchema;
