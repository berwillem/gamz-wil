const { check ,validationResult } = require("express-validator");

exports.validateUser = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Username is messing!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 30 characters long!"),
  check("email")
    .normalizeEmail()
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Format email invalid"),
  check("password")
    .exists()
    .withMessage("Password  is required")
    .isLength({ min: 8 }, { max: 20 })
    .withMessage("password must be 8 to 20 characters long!"),
];
exports.validate = (req, res, next) => {
    const errors = validationResult(req).array();
    if (!errors.length) {
      return next();
    }
    res.status(400).json({ success: false, error: errors[0].msg });
  };
  
