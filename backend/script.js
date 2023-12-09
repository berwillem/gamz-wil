const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./app/models/Post");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://willem:pdOlsME5bnhqnxOL@cluster66.ouukkrz.mongodb.net/gamz?authMechanism=DEFAULT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const localAssetsPath = path.join(__dirname, "../front-end/assets/posts");

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
          console.log(`After: /assets/posts/${localFilename}`);
          image.url = `/assets/posts/${localFilename}`;
        } else {
          console.error(`Local file not found: ${localFilePath}`);
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
