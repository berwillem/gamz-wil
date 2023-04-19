const { Category, Subcategory } = require('../models/category');
const createSubcategory = async (subcategoryData, parentId) => {
    const newSubcategory = new Subcategory({
      name: subcategoryData.name,
      parent: parentId,
      subcategories: []
    });
  
    if (subcategoryData.subcategories && subcategoryData.subcategories.length > 0) {
      for (const subsubcategoryData of subcategoryData.subcategories) {
        const newSubsubcategory = await createSubcategory(subsubcategoryData, newSubcategory._id);
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
        subcategories: []
      });
  
      if (subcategories && subcategories.length > 0) {
        for (const subcategory of subcategories) {
          const newSubcategory = await createSubcategory(subcategory, newCategory._id);
          newCategory.subcategories.push(newSubcategory);
        }
      }
  
      res.status(201).json({ category: await newCategory.save() });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  
module.exports = {
    createCategory,
    createSubcategory
  };
  


