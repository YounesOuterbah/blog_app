const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/all", verifyToken, getAllUsers);
// router.route("/all").get(verifyToken, getAllUsers);

module.exports = router;
