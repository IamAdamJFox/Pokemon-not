// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async savePokemon({ user, body }, res) {
    try {
      // Fetch the user
      const foundUser = await User.findById(user._id);
  
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if pokemon is already saved
      const existingPokemonIndex = foundUser.savedPokemons.findIndex(p => p.pokemonId === body.pokemonId);
  
      if (existingPokemonIndex !== -1) {
        // Update existing Pokemon
        foundUser.savedPokemons[existingPokemonIndex] = body;
      } else {
        // Add new Pokemon
        foundUser.savedPokemons.push(body);
      }
  
      const updatedUser = await foundUser.save();
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  
  async deletePokemon({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedPokemons: { pokemonId: params.pokemonId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },
  
  async saveCurrentPokemon({ user, body }, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { currentPokemon: body },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  }
  
};
