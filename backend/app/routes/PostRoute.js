const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByCategoryId,
  getPostCount,
  getPostsBySubcategory,
  deletePost,
  getMonthlyArchiveCounts,
} = require("../controllers/postController");
const { adminAuthMiddleware } = require("../middlewares/authval");
const uploadImages = require("../middlewares/cloudinary");

router.post("/create", uploadImages("posts"), createPost);
router.post("/archive", getMonthlyArchiveCounts);
router.get("/subcategory/:subcategoryId", getPostsBySubcategory);
router.get("/count", getPostCount);
router.get("/:id", getPostById);
router.get("/category/:categoryId", getPostsByCategoryId);
router.get("/", getAllPosts);
router.delete("/:id", deletePost);

module.exports = router;
