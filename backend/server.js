const express = require("express");
const app = express();
const mongoose = require("./config/db");
const authRoute = require("./app/routes/AuthRoute");
const CategoryRoute = require("./app/routes/CategoryRoute");
const postRoute = require("./app/routes/PostRoute");
const UserRoute = require("./app/routes/UserRoute");
const PubRoute = require("./app/routes/PubRoute");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("dotenv").config();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/pub", PubRoute);
app.use("/api/v1/user", UserRoute);

// Server handling
const PORT = process.env.PORTS || 5000;
app.listen(PORT, () => {
  console.log(`Express server is running on PORT ${PORT}...`);
});
