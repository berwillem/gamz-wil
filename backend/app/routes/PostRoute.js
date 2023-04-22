const router = require("express").Router();
const {createPost } = require("../controllers/postController");
const uploadImages = require("../middlewares/cloudinary");

// createpost endpoint
    router.post("/create",uploadImages("posts"),createPost );



    
module.exports = router;
