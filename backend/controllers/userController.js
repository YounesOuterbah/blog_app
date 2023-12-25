const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

const getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "not allowed, only admin" });
  }

  const users = await User.find();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById();
});

module.exports = {
  getAllUsers,
  getUser,
};
