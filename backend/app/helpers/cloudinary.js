const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only images are allowed."));
    }
    callback(null, true);
  },
});

const uploadImages = (folderName) => (req, res, next) => {
  const uploadMiddleware = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]);
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    const avatarFile = req.files["avatar"][0];
    const bannerFile = req.files["banner"][0];

    Promise.all([
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          avatarFile.path,
          {
            folder: folderName,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      }),
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          bannerFile.path,
          {
            folder: folderName,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      })
    ])
      .then((uploadedImages) => {
        const avatarUrl = uploadedImages[0].url;
        const avatarPublicId = uploadedImages[0].public_id;
        const bannerUrl = uploadedImages[1].url;
        const bannerPublicId = uploadedImages[1].public_id;

        req.avatar = {
          url: avatarUrl,
          public_id: avatarPublicId
        };
        req.banner = {
          url: bannerUrl,
          public_id: bannerPublicId
        };
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
};

module.exports = uploadImages;
