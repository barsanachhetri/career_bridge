const express = require("express");
const router = express.Router();
const { signup, login, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/authController");
const { resetPassword } = require("../controllers/authController");


router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.post("/signup", signup);
router.post("/login", login);
router.put("/reset-password", resetPassword);

module.exports = router;
