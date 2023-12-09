const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByCategoryId,
  getPostCount,
  getPostsBySubcategory,
  deletePost,
} = require("../controllers/postController");
const { adminAuthMiddleware } = require("../middlewares/authval");
const uploadImagesLocal = require("../middlewares/uploadImageLocal");

router.post("/create", uploadImagesLocal("posts"), createPost);
router.get("/subcategory/:subcategoryId", getPostsBySubcategory);
router.get("/count", getPostCount);
router.get("/:id", getPostById);
router.get("/category/:categoryId", getPostsByCategoryId);
router.get("/", getAllPosts);
router.delete("/:id", adminAuthMiddleware, deletePost);

module.exports = router;
