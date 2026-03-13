const express = require("express");
const router = express.Router();
const multer = require("multer");
const { shortlistMultiple } = require("../controllers/applicationController");

const {
  applyJob,
  getApplications,
  updateStatus,
  getMyApplications
} = require("../controllers/applicationController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Student routes
router.post("/apply", protect, upload.single("resume"), applyJob);
router.get("/my", protect, getMyApplications);

// Admin routes
router.get("/", protect, adminOnly, getApplications);
router.put("/shortlist-multiple", protect, adminOnly, shortlistMultiple);
router.put("/:id", protect, adminOnly, updateStatus);


module.exports = router;