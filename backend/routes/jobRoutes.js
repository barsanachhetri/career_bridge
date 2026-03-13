const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    createJob,
    getJobs,
    deleteJob,
    getCompanyStatistics
} = require("../controllers/jobController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/", protect, adminOnly, upload.single("jobPdf"), createJob);

router.get("/", protect, getJobs);
router.get("/statistics/company", protect, adminOnly, getCompanyStatistics);
router.delete("/:id", protect, adminOnly, deleteJob);

module.exports = router;