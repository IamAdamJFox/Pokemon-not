const mongoose = require('mongoose');
//change database name when we have an official app name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pokemon-not');

module.exports = mongoose.connection;
