const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./app/models/Post");

// Connect to MongoDB
const db = mongoose.connection;

// Log MongoDB connection events
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connect("mongodb://127.0.0.1:27017/gamz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const localAssetsPath = path.join(__dirname, "assets", "posts");

async function updateRecords() {
  try {
    const products = await Product.find();

    for (const product of products) {
      for (const image of product.images) {
        const localFilename = path.basename(image.url);
        console.log("local file", localFilename);
        const localFilePath = path.join(localAssetsPath, localFilename);

        if (fs.existsSync(localFilePath)) {
          console.log(`Updating image URL for product ${product._id}`);
          console.log(`Before: ${image.url}`);
          console.log(`After: ${localFilePath}`);

          image.url = `http://localhost:5000/images/posts/${localFilename}`;
        }
      }

      await product.save();
    }

    console.log("Records updated successfully");
  } catch (error) {
    console.error("Error updating records:", error);
  }
}

updateRecords();
