const router = require("express").Router();
const uploadImages = require("../middlewares/cloudinary");
const {
  deleteUserById,
  getAllUsers,
  updateUser,
  getUserById,
  getUserCount,
} = require("../controllers/userController");

// GET all users
router.get("/", getAllUsers);

// GET user count
router.get("/count", getUserCount);

// GET user by ID
router.get("/:id", getUserById);

// DELETE user by username
router.delete("/:id", deleteUserById);

// UPDATE user
router.put("/", uploadImages("users"), updateUser);

module.exports = router;
