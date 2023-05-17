const router = require("express").Router();
const { createPost, getAllPosts, getPostById, getPostsByCategoryId, getPostCount } = require("../controllers/postController");
const uploadImages = require("../middlewares/cloudinary");
const {verifyToken} =require("../middlewares/authval")

router.post("/create", verifyToken,uploadImages("posts"), createPost);
router.get("/count", getPostCount);
router.get("/:id", getPostById);
router.get("/category/:categoryId", getPostsByCategoryId);
router.get("/", getAllPosts);

module.exports = router;
