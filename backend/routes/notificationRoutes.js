const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotifications,
  markAsRead
} = require("../controllers/notificationController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createNotification);
router.get("/", protect, getNotifications);
router.put("/read/:id", protect, markAsRead);

module.exports = router;