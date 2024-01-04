const router = require("express").Router();
const {
  deleteCategory,
  getCategories,
  createCategory,
} = require("../controllers/categoriesController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { validateObjectID } = require("../middlewares/validateObjectID");

// /api/categories
router.route("/").post(verifyTokenAndAdmin, createCategory).get(getCategories);

// /api/categories/:id
router.route("/:id").delete(validateObjectID, verifyTokenAndAdmin, deleteCategory);

module.exports = router;
