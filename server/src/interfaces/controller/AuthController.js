
const registerUser = require('../../usecases/auth/registerUser');
const loginUser = require('../../usecases/auth/loginUser');

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ status: 'success', message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  register,
  userLogin,
};
