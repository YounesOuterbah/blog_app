const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  getUsersCount,
  profilePictureUpload,
  deleteUserProfile,
} = require("../controllers/userController");
const {
  verifyTokenAndAdmin,
  verifyTokenOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const { validateObjectID } = require("../middlewares/validateObjectID");
const pictureUpload = require("../middlewares/pictureUpload");

router.get("/all", verifyTokenAndAdmin, getAllUsers);

router.post("/all/upload", verifyToken, pictureUpload.single("image"), profilePictureUpload);

router
  .route("/all/:id")
  .get(validateObjectID, getUser)
  .put(validateObjectID, verifyTokenOnlyUser, updateUser)
  .delete(validateObjectID, verifyTokenAndAuthorization, deleteUserProfile);

router.get("/count", verifyTokenAndAdmin, getUsersCount);

module.exports = router;
