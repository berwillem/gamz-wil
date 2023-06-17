const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = multer.diskStorage({
  limits: {
    fileSize: 50  * 1024 * 1024, 
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only images are allowed."));
    }
    callback(null, true);
  },
});

module.exports = upload;
