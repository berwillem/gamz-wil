const express = require("express");
const app = express();
const mongoose = require("./config/db");
const uploadImage = require("./app/helpers/cloudinary");
const authRoute=require("./app/routes/AuthRoute")
const CategoryRoute=require("./app/routes/CategoryRoute")
const postRoute=require("./app/routes/postRoute")
const UserRoute=require("./app/routes/UserRoute")
const cors = require('cors');
const uploadImages = require("./app/helpers/cloudinary");
const uploadPostImages = uploadImages("posts");
require('dotenv').config()
app.use(cors());
app.use(express.json());



// POST /posts
app.post("/posts", uploadPostImages, (req, res) => {
  // Do something with the uploaded images
  console.log(req.body);
  console.log(req.files);
  res.send("Images uploaded successfully.");
});
//* routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category',CategoryRoute);
app.use('/api/v1/post',postRoute);
app.use('/api/v1/user',UserRoute); 

//*  serveur handling :::

const PORT = process.env.PORTS || 5000;
app.listen(5000, () => {
    console.log(`Express server is running on PORT ${PORT}...`);
});
