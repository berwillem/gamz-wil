const { Category, Subcategory } = require("../models/category");
const createSubcategory = async (subcategoryData, parentId) => {
  const newSubcategory = new Subcategory({
    name: subcategoryData.name,
    parent: parentId,
    subcategories: [],
  });

  if (
    subcategoryData.subcategories &&
    subcategoryData.subcategories.length > 0
  ) {
    for (const subsubcategoryData of subcategoryData.subcategories) {
      const newSubsubcategory = await createSubcategory(
        subsubcategoryData,
        newSubcategory._id
      );
      newSubcategory.subcategories.push(newSubsubcategory);
    }
  }

  await newSubcategory.save();
  return newSubcategory;
};
const createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const newCategory = await Category.create({
      name,
      subcategories: [],
    });

    if (subcategories && subcategories.length > 0) {
      for (const subcategory of subcategories) {
        const newSubcategory = await createSubcategory(
          subcategory,
          newCategory._id
        );
        newCategory.subcategories.push(newSubcategory);
      }
    }

    res.status(201).json({ category: await newCategory.save() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await Subcategory.find({ parent: categoryId });
    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const sortedCategories = categories.sort(
      (a, b) => b.name.length - a.name.length
    );
    res.status(200).json(sortedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createCategory,
  createSubcategory,
  getSubcategoriesByCategory,
  getAllCategories,
};
