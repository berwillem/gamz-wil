const router = require("express").Router();
const passport = require("passport");

const {
  register,
  signin,
  verifyEmail,
  forgotpassword,
  resetpassword,
} = require("../controllers/authController");
const {
  googleAuthMiddleware,
  googleAuthCallback,
  facebookAuthMiddleware,
  facebookAuthCallback,
} = require("../controllers/authSocialController");
const { isResetTokenValid } = require("../middlewares/user.js");
const { validateUser, validate } = require("../middlewares/validator.js");

// Register endpoint
router.post("/register", validateUser, validate, register);
// Login endpoint
router.post("/signin", signin);
// verification email endpoint
router.post("/verify-email", verifyEmail);
// password forgot endpoint
router.post("/forgot-password", forgotpassword);
// reset password
router.post("/reset-password", isResetTokenValid, resetpassword);
router.get("/verify-token", isResetTokenValid, (req, res) => {
  res.json({ success: true });
});
// Google authentication routes
router.get("/google", googleAuthMiddleware);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  googleAuthCallback
);
router.get("/facebook", facebookAuthMiddleware);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  facebookAuthCallback
);

module.exports = router;
