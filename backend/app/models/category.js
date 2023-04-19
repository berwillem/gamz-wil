const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }]
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }]
});


const Category = mongoose.model('Category', categorySchema);

module.exports = { Category, Subcategory };

