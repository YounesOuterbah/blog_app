const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
const { validateObjectID } = require("../middlewares/validateObjectID");

router.route("/").get(getComments).post(verifyToken, createComment);
router.route("/:id").delete(validateObjectID, verifyToken, deleteComment).put(updateComment);

module.exports = router;
