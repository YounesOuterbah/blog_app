const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { createComment, getComments, deleteComment } = require("../controllers/commentController");
const { validateObjectID } = require("../middlewares/validateObjectID");

router.route("/").get(getComments).post(verifyToken, createComment);
router.delete("/:id", validateObjectID, verifyToken, deleteComment);

module.exports = router;
