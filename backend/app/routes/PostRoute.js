const router = require("express").Router();
const { createPost, getAllPosts } = require("../controllers/postController");
const uploadImages = require("../middlewares/cloudinary");

router.post("/create", uploadImages("posts"), createPost);
router.get("/", getAllPosts);

module.exports = router;
