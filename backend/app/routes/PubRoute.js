const router = require("express").Router();
const { createPub, getPub } = require("../controllers/pubController");
const { sessionMiddleware } = require("../middlewares/authval");
const uploadImages = require("../middlewares/cloudinary");

router.post("/",sessionMiddleware,uploadImages("pubs"),createPub);
router.get("/", getPub);

module.exports = router;
