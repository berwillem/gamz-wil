const express = require("express");
const app = express();
const mongoose = require("./config/db");
const session = require("express-session");
const authRoute = require("./app/routes/AuthRoute");
const CategoryRoute = require("./app/routes/CategoryRoute");
const postRoute = require("./app/routes/PostRoute");
const UserRoute = require("./app/routes/UserRoute");
const PubRoute = require("./app/routes/PubRoute");

const cors = require("cors");
const path = require("path");
require("dotenv").config();
app.use(
  session({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//* routes
app.use(
  "/images/posts",
  express.static(path.join(__dirname, "assets", "posts"))
);
app.use(
  "/images/users",
  express.static(path.join(__dirname, "assets", "users"))
);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/pub", PubRoute);
app.use("/api/v1/user", UserRoute);

//*  serveur handling :::

const PORT = process.env.PORTS || 5000;
app.listen(5000, () => {
  console.log(`Express server is running on PORT ${PORT}...`);
});
