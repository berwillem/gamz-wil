const mongoose = require("mongoose");

const sidepubSchema = new mongoose.Schema({
  image1: {
    url: { type: String, required: true },
    redirect: { type: String, required: true },
  },

  image2: {
    url: { type: String, required: true },
    redirect: { type: String, required: true },
  },
});

const Sidepub = new mongoose.model("Sidepub", sidepubSchema);
module.exports = Sidepub;
