const router = require("express").Router();
const uploadImages=require("../middlewares/cloudinary")
const { deleteUserByUsername, getAllUsers,  getUserByUsername, updateUser } = require("../controllers/userController");
// const {verifyTokenAndAdmin}=require("../middlewares/authval")
// GET all users
router.get("/",getAllUsers);
// GET user by ID
router.get("/:username", getUserByUsername);
// deleteUser endpoint
router.delete("/:username", deleteUserByUsername);
// UPDATE user by ID
router.put("/",uploadImages("users"),updateUser);
module.exports = router;
