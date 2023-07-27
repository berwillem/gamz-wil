const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

exports.googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = async (req, res) => {
  try {
    const { id, displayName, emails } = req.user;

    let existingUser = await User.findOne({ googleId: id });

    if (existingUser) {
      if (!existingUser.email) {
        existingUser.email = emails[0].value;
      }

      await existingUser.save();

      res.send("Google account linked successfully!");
    } else {
      const newUser = new User({
        username: displayName,
        email: emails[0].value,
        googleId: id,
        isVerified: true,
      });

      await newUser.save();

      res.send("New account created and logged in via Google!");
    }
  } catch (error) {
    console.error(error);

    res.status(500).send("An error occurred during registration.");
  }
};
