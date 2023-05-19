const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  pub: [
    {
      url: { type: String },
      publicId: { type: String },
    },
  ],
});

module.exports = mongoose.model("Pub", pubSchema);
