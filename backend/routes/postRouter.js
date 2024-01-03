const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getPost,
  getPostAmount,
  deletePost,
  updatePost,
  updatePostIMG,
  toggleLike,
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");
const { validateObjectID } = require("../middlewares/validateObjectID");
const pictureUpload = require("../middlewares/pictureUpload");

router.route("/").get(getPosts).post(verifyToken, pictureUpload.single("image"), createPost);
router
  .route("/:id")
  .get(validateObjectID, getPost)
  .delete(validateObjectID, verifyToken, deletePost)
  .put(validateObjectID, verifyToken, updatePost);
router.get("/count", getPostAmount);

router.put(
  "/update-img/:id",
  validateObjectID,
  verifyToken,
  pictureUpload.single("image"),
  updatePostIMG
);

router.put("/like/:id", validateObjectID, verifyToken, toggleLike);

module.exports = router;
