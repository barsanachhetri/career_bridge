const Job = require("../models/Job");
const User = require("../models/User");   // ADD THIS LINE

exports.createJob = async (req, res) => {
  try {

    const {
      companyName,
      role,
      tier,
      description,
      eligibleBranches,

      deadline
    } = req.body;

    const job = await Job.create({
      companyName,
      role,
      tier,
      description,
      eligibleBranches,

      deadline,
      jobDescriptionPdf: req.file ? req.file.path : null


    });

    res.json(job);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


exports.getJobs = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    let jobs;

    if (user.role === "student") {
      // Tier 1 student can see Tier 1,2,3 jobs
      // Tier 2 student can see Tier 2,3 jobs
      // Tier 3 student can see only Tier 3 jobs
      // Logic: student.tier <= job.tier
      jobs = await Job.find({ tier: { $gte: user.tier } });
    } else {
      jobs = await Job.find();
    }

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};

exports.getCompanyStatistics = async (req, res) => {
  try {
    // Aggregate jobs by company name and get the earliest createdAt date
    const companies = await Job.aggregate([
      {
        $group: {
          _id: "$companyName",
          visitDate: { $min: "$createdAt" },
          totalJobs: { $sum: 1 }
        }
      },
      {
        $sort: { visitDate: -1 }
      },
      {
        $project: {
          _id: 0,
          companyName: "$_id",
          visitDate: 1,
          totalJobs: 1
        }
      }
    ]);

    const totalCompanies = companies.length;

    res.json({
      totalCompanies,
      companies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};