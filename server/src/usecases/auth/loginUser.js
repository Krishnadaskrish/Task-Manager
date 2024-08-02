const userRepository = require('../../infrastructure/data/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Password incorrect');
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};

module.exports = loginUser;
