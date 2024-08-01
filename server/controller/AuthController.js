const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userSchema} = require('../models/ValidationSchema')

const register = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      console.error(error.details);
      return res.status(400).send({ message: 'Validation error', errors: error.details });
    }

    const { name, email, password } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    

    const user = new User({
      name,
      email,
      password: password,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  if (!password || !user.password) {
    return res.status(400).json({ status: "error", message: "Invalid input" });
  }

  const checkPass = await bcrypt.compare(password, user.password);
  console.log(checkPass);
  if (!checkPass) {
    return res
      .status(400)
      .json({ status: "error", message: "password incorrect" });
  }

  const token = jwt.sign(
    { email: user.email },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 86400,
    }
  );
  console.log(token);
  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: token,
    email
    
  });
};

module.exports = {
  register,
  userLogin,
};
