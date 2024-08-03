const multer = require("multer");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_KEY_SECRET,
// });
// change the config
const storage = multer.diskStorage({
  limits: {
    fileSize: 50  * 1024 * 1024, 
  },
  destination: (req, file, cb) => {
    // const fieldName = file.fieldname; // get the form data field name
    const destinationFolder = `/var/www/html/images/`; // set the destination folder based on the field name
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + file.originalname.split(".").at(-1));
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
