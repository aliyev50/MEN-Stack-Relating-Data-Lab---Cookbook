const mongoose = require('mongoose');
const foodSchema = require('./food');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;