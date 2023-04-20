const mongoose = require("mongoose");

const pubSchema = new mongoose.Schema({
  bannerPub: {
    url: { type: String },
    publicId: { type: String },
  },
  smallPub: [
    {
      url: { type: String },
      publicId: { type: String },
    },
  ],
});

module.exports = mongoose.model("pub", pubSchema);
