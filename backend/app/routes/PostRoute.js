const router = require("express").Router();
const {createPost } = require("../controllers/postController");

// createpost endpoint
router.post("/create",createPost );

module.exports = router;
