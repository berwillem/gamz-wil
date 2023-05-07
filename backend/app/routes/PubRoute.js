const router = require("express").Router();
const { createPub } = require("../controllers/pubController");
const uploadImages = require("../middlewares/cloudinary");

router.post("/", uploadImages("pubs"),createPub);

module.exports = router;
