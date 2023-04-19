const router = require("express").Router();
const { createCategory, createSubcategory } = require("../controllers/categorieController");
const {  } = require("../controllers/postController");

router.post("/createCategory",createCategory );
router.post("/createSubcategory",createSubcategory);

module.exports = router;