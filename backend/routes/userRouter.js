const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  getUsersCount,
  profilePictureUpload,
} = require("../controllers/userController");
const {
  verifyTokenAndAdmin,
  verifyTokenOnlyUser,
  verifyToken,
} = require("../middlewares/verifyToken");
const { validateObjectID } = require("../middlewares/validateObjectID");
const pictureUpload = require("../middlewares/pictureUpload");

router.get("/all", verifyTokenAndAdmin, getAllUsers);

router.post("/all/upload", verifyToken, pictureUpload.single("image"), profilePictureUpload);

router
  .route("/all/:id")
  .get(validateObjectID, getUser)
  .put(validateObjectID, verifyTokenOnlyUser, updateUser);

router.get("/count", verifyTokenAndAdmin, getUsersCount);

module.exports = router;
