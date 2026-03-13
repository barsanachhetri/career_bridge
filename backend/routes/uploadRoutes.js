const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Resume Route
router.post("/", protect, upload.single("resume"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.resume = req.file.path;
    await user.save();

    res.json({
      message: "Resume uploaded successfully",
      filePath: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;