const router = require("express").Router();
const { createCategory, createSubcategory, getSubcategoriesByCategory, getAllCategories } = require("../controllers/categorieController");


router.post("/createCategory",createCategory );
router.get("/",getAllCategories );
router.post("/createSubcategory",createSubcategory);
router.get("/:categoryId",getSubcategoriesByCategory);

module.exports = router;