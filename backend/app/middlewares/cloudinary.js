const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const uploadConfig = require("./uploadConfig");

const uploadImages = (folderName) => {
  const uploadMiddleware = uploadConfig.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "images", maxCount: 3 },
    { name: "pub", maxCount: 3 },
    { name: "cardOneImage", maxCount: 1 },
    { name: "cardTwoImage", maxCount: 1 },
  ]);

  return async (req, res, next) => {
    try {
      await uploadMiddleware(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
        } else if (err) {
          return res.status(500).json({ error: err.message });
        }

        const getFilePromise = (file) => {
          if (file) {
            return cloudinary.uploader.upload(file.path, {
              folder: folderName,
            });
          } else {
            return Promise.resolve(null);
          }
        };

        const uploadedImages = {};

        // Handle avatar file
        if (req.files["avatar"]) {
          // const avatarUpload = getFilePromise(req.files["avatar"][0]);
          uploadedImages.avatar = req.files["avatar"][0].path.replace(
            /^\/var\/www\/html/,
            ""
          );
        }

        // Handle banner file
        if (req.files["banner"]) {
          // const bannerUpload = getFilePromise(req.files["banner"][0]);
          uploadedImages.banner = req.files["banner"][0].path.replace(
            /^\/var\/www\/html/,
            ""
          );
        }

        // Handle cardOneImage file
        if (req.files["cardOneImage"]) {
          // const cardOneImageUpload = getFilePromise(req.files["cardOneImage"][0]);
          uploadedImages.cardOneImage = req.files[
            "cardOneImage"
          ][0].path.replace(/^\/var\/www\/html/, "");
        }

        // Handle cardTwoImage file
        if (req.files["cardTwoImage"]) {
          // const cardTwoImageUpload = getFilePromise(req.files["cardTwoImage"][0]);
          uploadedImages.cardTwoImage = req.files[
            "cardTwoImage"
          ][0].path.replace(/^\/var\/www\/html/, "");
        }

        // Handle images files
        if (req.files["images"]) {
          // const imagesUploadPromises = req.files["images"].map(getFilePromise);
          uploadedImages.images = req.files["images"].map((image) =>
            image.path.replace(/^\/var\/www\/html/, "")
          );
        }

        // Handle pub files
        if (req.files["pub"]) {
          // const pubUploadPromises = req.files["pub"].map(getFilePromise);
          uploadedImages.pub = req.files["pub"].map((image) =>
            image.path.replace(/^\/var\/www\/html/, "")
          );
        }

        const mapImage = (image) => ({
          url: image || null,
          publicId: image?.public_id || null,
        });

        // Modify the conditional checks for avatar and banner
        if (!req.body.avatar) {
          req.body.avatar = uploadedImages.avatar || null;
        }

        if (!req.body.banner) {
          req.body.banner = uploadedImages.banner || null;
        }

        req.body.cardOneImage = mapImage(uploadedImages.cardOneImage) || null;
        req.body.cardTwoImage = mapImage(uploadedImages.cardTwoImage) || null;
        req.body.images = (uploadedImages.images || []).map(mapImage);
        req.body.pub = (uploadedImages.pub || []).map(mapImage);

        next();
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = uploadImages;
