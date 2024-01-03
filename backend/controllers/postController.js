const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post, validateCreatePost, validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");

const getPosts = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;

  let posts;

  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category }).populate("user", ["-password"]);
  } else {
    posts = await Post.find().sort({ createdAt: -1 }).populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", ["-password"]);

  if (!post) {
    res.status(400).json({ message: "post not found" });
  }

  res.status(200).json(post);
});

const getPostAmount = asyncHandler(async (req, res) => {
  const post = await Post.countDocuments();

  if (!post) {
    res.status(400).json({ message: "something went wrong" });
  }

  res.status(200).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../imgs/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    img: {
      url: result.secure_rul,
      publicId: result.public_id,
    },
  });

  res.status(201).json(post);

  fs.unlinkSync(imagePath);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "no post found" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.img.publicId);

    // @TODO delete all comments NEXT
  } else {
    return res.status(403).json({ message: "access denied, forbidden" });
  }

  res.status(200).json({ message: "post has been deleted sccussefuly" });
});

const updatePost = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(403).json({ message: "no post found" });
  }

  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({ message: "access denied, you are not allowed" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  res.status(200).json(updatedPost);
});

const updatePostIMG = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(403).json({ message: "no post found" });
  }

  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({ message: "access denied, you are not allowed" });
  }

  await cloudinaryRemoveImage(post.img.publicId);

  const imagePath = await path.join(__dirname, `../imgs/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        img: {
          url: result.secure_rul,
          publicId: result.publicId,
        },
      },
    },
    { new: true }
  );

  res.status(200).json(updatedPost);

  fs.unlinkSync(imagePath);
});

const toggleLike = asyncHandler(async (req, res) => {
  const loggedUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "no post found" });
  }

  const isPostLiked = post.likes.find((user) => user.toString() === loggedUser);

  if (isPostLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: loggedUser,
        },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: loggedUser,
        },
      },
      { new: true }
    );
  }

  res.status(200).json(post);
});

module.exports = {
  getPosts,
  getPost,
  getPostAmount,
  createPost,
  deletePost,
  updatePost,
  updatePostIMG,
  toggleLike,
};
