const mongoose = require("mongoose");

const archiveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    reason: {
      type: String,
      enum: ["sold_in", "sold_out", "other"], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Archive = mongoose.model("Archive", archiveSchema)

module.exports = Archive