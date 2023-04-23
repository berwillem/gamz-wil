const router = require("express").Router();
const uploadImages=require("../middlewares/cloudinary")
const { deleteUserByUsername, getAllUsers,  getUserByUsername, updateUser } = require("../controllers/userController");
const {verifyToken}=require("../middlewares/authval")
// GET all users
router.get("/", verifyToken,getAllUsers);
// GET user by ID
router.get("/:username", getUserByUsername);
// deleteUser endpoint
router.delete("/:username", deleteUserByUsername);
// UPDATE user by ID
router.put("/:id",uploadImages("users"),updateUser);
module.exports = router;
