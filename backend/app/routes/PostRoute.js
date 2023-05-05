const router = require("express").Router();
const { createPost, getAllPosts, getPostById } = require("../controllers/postController");
const uploadImages = require("../middlewares/cloudinary");

router.post("/create", uploadImages("posts"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

module.exports = router;
