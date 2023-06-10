const router = require("express").Router();
const { createPost, getAllPosts, getPostById, getPostsByCategoryId, getPostCount, getPostsBySubcategory, deletePost } = require("../controllers/postController");
const uploadImages = require("../middlewares/cloudinary");
// const {verifyToken} =require("../middlewares/authval")

router.post("/create",uploadImages("posts"), createPost);
router.get('/subcategory/:subcategoryId', getPostsBySubcategory);
router.get("/count", getPostCount);
router.get("/:id", getPostById);
router.get("/category/:categoryId", getPostsByCategoryId);
router.get("/", getAllPosts);
router.delete("/:id", deletePost);

module.exports = router;
