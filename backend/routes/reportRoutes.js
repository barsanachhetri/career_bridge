const express = require("express");
const router = express.Router();

const { getStatistics } = require("../controllers/reportController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/stats", protect, adminOnly, getStatistics);

module.exports = router;