const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://gamz-dz.com:5000/api/v1/auth/google/callback",
    },
    (profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.emails[0].value);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      done(null, user);
    } else {
      done(new Error("User not found"));
    }
  } catch (error) {
    done(error);
  }
});

exports.googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = async (req, res) => {
  try {
    const { displayName, emails } = req.user;

    let existingUser = await User.findOne({ email: emails[0].value });

    if (existingUser) {
      if (!existingUser.email) {
        existingUser.email = emails[0].value;
        await existingUser.save();
      }
    } else {
      const newUser = new User({
        username: displayName,
        email: emails[0].value,
        password: generator.generate({
          length: 10,
          numbers: true,
        }),
        verified: true,
      });

      await newUser.save();
    }

    const user = await User.findOne({ email: emails[0].value });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const redirectUrl =
      "https://gamz-dz.com:5173/?user=" +
      encodeURIComponent(
        JSON.stringify({
          username: user.username,
          email: user.email,
          id: user._id,
          token,
          verified: user.verified,
          infoUpdate: user.infoUpdate,
          avatar: user.avatar,
          banner: user.banner,
          isAdmin: user.isAdmin,
        })
      );

    res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during Google login.");
  }
};
