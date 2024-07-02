const router = require("express").Router();

const { createPub, getPub, getPubNoCach } = require("../controllers/pubController");
const {
  createPubMobil,
  getPubMobil,
} = require("../controllers/pubMobilController");
const { sessionMiddleware } = require("../middlewares/authval");
const uploadImages = require("../middlewares/cloudinary");

router.post("/", sessionMiddleware, uploadImages("pubs"), createPub);
router.get("/", getPub);
router.get("/noCache", getPubNoCach);
router.post("/mobil", uploadImages("pubs"), createPubMobil);
router.get("/mobil", getPubMobil);

module.exports = router;
