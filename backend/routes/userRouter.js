const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  getUsersCount,
} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenOnlyUser } = require("../middlewares/verifyToken");
const { validateObjectID } = require("../middlewares/validateObjectID");

router.get("/all", verifyTokenAndAdmin, getAllUsers);
router.get("/count", verifyTokenAndAdmin, getUsersCount);
router
  .route("/all/:id")
  .get(validateObjectID, getUser)
  .put(validateObjectID, verifyTokenOnlyUser, updateUser);

module.exports = router;
