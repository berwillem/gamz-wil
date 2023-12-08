const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./app/models/User");

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

const localAssetsPath = path.join(__dirname, "assets", "users");

async function updateRecords() {
  try {
    const users = await User.find();

    for (const user of users) {
      // Update avatar
      if (user.avatar && user.avatar.url) {
        const avatarFilename = path.basename(user.avatar.url);
        const avatarFilePath = path.join(localAssetsPath, avatarFilename);

        if (fs.existsSync(avatarFilePath)) {
          console.log(`Updating avatar URL for user ${user._id}`);
          console.log(`Before: ${user.avatar.url}`);
          console.log(`After: ${avatarFilePath}`);

          user.avatar.url = `http://localhost:5000/images/users/${avatarFilename}`;
        }
      }

      // Update banner
      if (user.banner && user.banner.url) {
        const bannerFilename = path.basename(user.banner.url);
        const bannerFilePath = path.join(localAssetsPath, bannerFilename);

        if (fs.existsSync(bannerFilePath)) {
          console.log(`Updating banner URL for user ${user._id}`);
          console.log(`Before: ${user.banner.url}`);
          console.log(`After: ${bannerFilePath}`);

          user.banner.url = `http://localhost:5000/images/users/${bannerFilename}`;
        }
      }

      await user.save();
    }

    console.log("Records updated successfully");
  } catch (error) {
    console.error("Error updating records:", error);
  }
}

updateRecords();
