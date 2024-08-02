const User = require('../../entities/UserSchema');
const userRepository = require('../../infrastructure/data/userRepository');
const bcrypt = require('bcrypt');
const { userSchema } = require('../../entities/ValidationSchema');

const registerUser = async (userData) => {
  const { error, value } = userSchema.validate(userData);

  if (error) {
    throw new Error('Validation error');
  }

  const { name, email, password } = value;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await userRepository.save(user);
};

module.exports = registerUser;
