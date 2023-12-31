const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveAllImg,
} = require("../utils/cloudinary");
const fs = require("fs");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUsersCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate("posts");

  if (!user) {
    res.status(400).json({ message: "user not found" });
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, password, bio } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username,
        password,
        bio,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

const profilePictureUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  const user = await User.findById(req.user.id);

  if (user.profilePicture.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePicture.publicId);
  }

  user.profilePicture = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  await user.save();

  res.status(200).json({
    message: "Your Picture Uploaded successfully",
    profilePicture: { url: result.secure_url, publicId: result.public_id },
  });

  fs.unlinkSync(imagePath);
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "user not found" });
  }

  const posts = await Post.find({ user: user._id });

  const publicIDs = posts?.map((post) => post.img.publicId);

  if (publicIDs?.length > 0) {
    await cloudinaryRemoveAllImg(publicIDs);
  }

  await cloudinaryRemoveImage(user.profilePicture.publicId);

  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Your Account Has Been Deleted" });
});

module.exports = {
  getAllUsers,
  getUsersCount,
  getUser,
  updateUser,
  profilePictureUpload,
  deleteUserProfile,
};
