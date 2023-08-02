const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePokemon,
  deletePokemon,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, savePokemon);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/pokemon/:pokemonId').delete(authMiddleware, deletePokemon);

module.exports = router;
