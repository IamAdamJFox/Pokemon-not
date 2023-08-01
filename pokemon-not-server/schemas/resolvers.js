const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    // Define the me resolver to get the current user's data
    Query: {
      me: async (parent, args, context) => {
          if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('savedBooks');
          }
  
          throw new AuthenticationError('You need to be logged in!');
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

    // Define the saveBook resolver to save a book to the user's account
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        ).populate('savedBooks');
    
        return updatedBooks;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },

    // Define the removeBook resolver to remove a book from the user's account
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
    
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