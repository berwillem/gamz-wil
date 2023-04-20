const mongoose =require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory'
    }],
    images: [{
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    }],
    
    wilaya: {
      type: String, 
      required: true,
    },
    commune:{
      type: String, 
      required: true,
    },
    num: {
      type: Number, 
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
;