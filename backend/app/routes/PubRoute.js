const router = require("express").Router();
const { createPub, getPub } = require("../controllers/pubController");
const uploadImages = require("../middlewares/cloudinary");

router.post("/", uploadImages("pubs"),createPub);
router.get("/", getPub);

module.exports = router;
