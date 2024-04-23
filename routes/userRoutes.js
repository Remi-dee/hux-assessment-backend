const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,

  getAllUsers,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", protect, getAllUsers);
router.get("/getMe", protect, getMe);

module.exports = router;
