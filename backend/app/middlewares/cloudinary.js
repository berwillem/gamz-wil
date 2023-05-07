const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const upload = require("./uploadConfig");

const uploadImages = (folderName) => (req, res, next) => {
  const uploadMiddleware = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "images", maxCount: 3 },
    { name: "pub", maxCount: 3 },
  ]);
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    const avatarFile = req.files["avatar"] ? req.files["avatar"][0] : null;
    const bannerFile = req.files["banner"] ? req.files["banner"][0] : null;

    const avatarUploadPromise = avatarFile
      ? new Promise((resolve, reject) => {
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
        })
      : Promise.resolve(null);

    const bannerUploadPromise = bannerFile
      ? new Promise((resolve, reject) => {
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
      : Promise.resolve(null);

    const imagesUploadPromises = req.files["images"]
      ? req.files["images"].map((image) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              image.path,
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
          });
        })
      : [];
    const pubUploadPromises = req.files["pub"]
      ? req.files["pub"].map((image) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              image.path,
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
          });
        })
      : [];

    Promise.all([
      avatarUploadPromise,
      bannerUploadPromise,
      ...imagesUploadPromises,
      ...pubUploadPromises
    ])
      .then((uploadedImages) => {
        const avatarUrl = uploadedImages[0] ? uploadedImages[0].url : null;
        const avatarPublicId = uploadedImages[0]
          ? uploadedImages[0].public_id
          : null;
        const bannerUrl = uploadedImages[1] ? uploadedImages[1].url : null;
        const bannerPublicId = uploadedImages[1]
          ? uploadedImages[1].public_id
          : null;

        const imageUrls = uploadedImages.slice(2).map((image) => image.url);
        const imagePublicIds = uploadedImages
          .slice(2)
          .map((image) => image.public_id);
        const pubUrls = uploadedImages.slice(2).map((image) => image.url);
        const pubPublicIds = uploadedImages
          .slice(2)
          .map((image) => image.public_id);

        req.body.avatar = {
          url: avatarUrl,
          public_id: avatarPublicId,
        };
        req.body.banner = {
          url: bannerUrl,
          public_id: bannerPublicId,
        };
        req.body.images = imageUrls.map((url, index) => {
          return {
            url,
            public_id: imagePublicIds[index],
          };
        });
        req.body.pub = pubUrls.map((url, index) => {
          return {
            url,
            public_id: pubPublicIds[index],
          };
        });
        next();
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
};

module.exports = uploadImages;
