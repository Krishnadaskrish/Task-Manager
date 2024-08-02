// src/infrastructure/data/userRepository.js

const User = require('../../entities/UserSchema');

const findByEmail = async (email) => {
  return User.findOne({ email });
};

const save = async (user) => {
  return new User(user).save();
};

module.exports = {
  findByEmail,
  save,
};
