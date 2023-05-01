const router = require("express").Router();
const { createCategory, createSubcategory, getSubcategoriesByCategory } = require("../controllers/categorieController");


router.post("/createCategory",createCategory );
router.post("/createSubcategory",createSubcategory);
router.get("/:categoryId",getSubcategoriesByCategory);

module.exports = router;