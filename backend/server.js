const express = require("express");
const app = express();
const mongoose = require("./config/db");
const authRoute = require("./app/routes/AuthRoute");
const CategoryRoute = require("./app/routes/CategoryRoute");
const postRoute = require("./app/routes/PostRoute");
const UserRoute = require("./app/routes/UserRoute");
const PubRoute =require("./app/routes/PubRoute")

const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

//* routes

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
