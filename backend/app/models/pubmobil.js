const mongoose = require("mongoose");

const pubmobilSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pub: [
    {
      url: { type: String },
      publicId: { type: String },
      _id: false,
    },
  ],
  redirectUrls: [
    {
      url: { type: String },
      _id: false,
    },
  ],
  cardOne: {
    title: { type: String },
    cardOneImage: {
      url: { type: String },
      publicId: { type: String },
    },
    redirect: { type: String },
  },
  cardTwo: {
    title: { type: String },
    cardTwoImage: {
      url: { type: String },
      publicId: { type: String },
    },
    redirect: { type: String },
  },
});

module.exports = mongoose.model("PubMobil", pubmobilSchema);
