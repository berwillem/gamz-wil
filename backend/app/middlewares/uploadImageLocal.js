const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadImagesLocal = (folderName) => {
  // Define storage for multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = path.join(__dirname, "../../", "assets", folderName);

      if (!fs.existsSync(destination)) {
        const error = new Error(`Folder not found: ${destination}`);
        return cb(error);
      }

      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  return (req, res, next) => {
    try {
      const uploadMiddleware = upload.array("images", 3);

      uploadMiddleware(req, res, (err) => {
        if (err) {
          // Check if res is defined before responding
          if (res) {
            res.status(500).json({ error: err.message });
          }
        } else {
          const localImages = req.files.map((file) => ({
            url: `http://localhost:5000/images/${folderName}/${file.originalname}`,
          }));

          req.body.images = localImages;

          next();
        }
      });
    } catch (error) {
      // Check if res is defined before responding
      if (res) {
        res.status(500).json({ error: error.message });
      }
    }
  };
};

module.exports = uploadImagesLocal;
