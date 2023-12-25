const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  const { username, email, password } = req.body;

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Email Already in Use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({ message: "User Created" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return res.json({ message: "user dosent exists" });
  }

  const passwordMatch = await bcrypt.compare(password, userExist.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Email Or Password Is Incorrect" });
  }

  const token = generateToken({ id: userExist._id, isAdmin: userExist.isAdmin });

  res.json(token);
});

// generate Token
function generateToken(obj) {
  return jwt.sign(obj, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
}

module.exports = {
  registerUser,
  loginUser,
};
