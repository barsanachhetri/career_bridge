const Application = require("../models/Application");

exports.getStatistics = async (req, res) => {
  try {

    const totalStudents = await Application.distinct("student");

    const placed = await Application.countDocuments({
      status: "Selected",
    });

    const shortlisted = await Application.countDocuments({
      status: "Shortlisted",
    });

    const rejected = await Application.countDocuments({
      status: "Rejected",
    });

    res.json({
      totalStudents: totalStudents.length,
      placed,
      shortlisted,
      rejected,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};