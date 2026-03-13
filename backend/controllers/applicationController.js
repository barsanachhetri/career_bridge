const Application = require("../models/Application");
const Job = require("../models/Job");
// ADD THIS
const Notification = require("../models/Notification");
exports.shortlistMultiple = async (req, res) => {

  try {

    const {
      applicationIds,
      roundName,
      roundDate,
      roundTime,
      instructions
    } = req.body;

    // Validate inputs
    if (!applicationIds || applicationIds.length === 0) {
      return res.status(400).json({ message: "No applications selected" });
    }

    if (!roundName || !roundDate || !roundTime || !instructions) {
      return res.status(400).json({ message: "All round details are required" });
    }

    let successCount = 0;
    const errors = [];

    for (const id of applicationIds) {

      try {
        const application = await Application.findById(id)
          .populate("student")
          .populate("job");

        if (!application) {
          errors.push(`Application ${id} not found`);
          continue;
        }

        application.status = "Shortlisted";

        application.roundName = roundName;
        application.roundDate = roundDate;
        application.roundTime = roundTime;
        application.instructions = instructions;

        await application.save();

        await Notification.create({

          student: application.student._id,

          title: "You are shortlisted!",

          message: `You are shortlisted for ${application.job.companyName}`,

          roundName,
          roundDate,
          roundTime,
          instructions

        });

        successCount++;

      } catch (singleError) {
        errors.push(`Error processing application ${id}: ${singleError.message}`);
      }

    }

    res.json({
      message: `Successfully shortlisted ${successCount} student(s)`,
      successCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {

    console.error("Shortlist error:", error);

    res.status(500).json({
      message: error.message || "Failed to shortlist students"
    });

  }

};

exports.updateStatus = async (req, res) => {
  try {

    const { action, status, roundName, roundDate, roundTime, instructions, package: packageName } = req.body;

    const application = await Application.findById(req.params.id)
      .populate("student")
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const User = require("../models/User");
    let notificationTitle = "";
    let notificationMessage = "";

    if (action === "nextRound") {
      // Move to next round
      application.roundNumber += 1;
      application.status = "Shortlisted";
      application.roundName = roundName;
      application.roundDate = roundDate;
      application.roundTime = roundTime;
      application.instructions = instructions;

      // Add to round history
      application.roundHistory.push({
        roundNumber: application.roundNumber,
        roundName,
        roundDate,
        roundTime,
        instructions
      });

      notificationTitle = `Round ${application.roundNumber}: ${roundName}`;
      notificationMessage = `Congratulations! You are shortlisted for Round ${application.roundNumber} (${roundName}) for ${application.job.companyName}. Date: ${roundDate} at ${roundTime}`;

    } else if (action === "reject") {
      // Reject application
      application.status = "Rejected";
      notificationTitle = "Application Status Update";
      notificationMessage = `Unfortunately, you were not selected for the next round at ${application.job.companyName}. Best of luck with other opportunities!`;

    } else if (action === "selected") {
      // Mark as selected
      application.status = "Selected";
      application.package = packageName;
      application.company = application.job.companyName;

      // Update user placement status
      await User.findByIdAndUpdate(application.student._id, {
        placed: false,
        company: application.job.companyName,
        package: packageName
      });

      notificationTitle = "🎉 Congratulations! You are Selected!";
      notificationMessage = `You have been selected for ${application.job.companyName}!\n\nRole: ${application.job.role}\nPackage: ${packageName}\n\nPlease report to the placement office for further details.`;

    } else if (action === "placed") {
      // Mark as placed
      application.status = "Placed";

      // Update user placement status
      await User.findByIdAndUpdate(application.student._id, {
        placed: true,
        company: application.job.companyName,
        package: packageName
      });

      notificationTitle = "✓ Placement Confirmed";
      notificationMessage = `Your placement with ${application.job.companyName} has been confirmed! Welcome to the team!`;

    } else {
      // Legacy: direct status update
      application.status = status;
      application.roundName = roundName;
      application.roundDate = roundDate;
      application.roundTime = roundTime;
      application.instructions = instructions;
      notificationTitle = "Application Status Updated";
      notificationMessage = `Your application status has been updated for ${application.job.companyName}`;
    }

    await application.save();

    // CREATE NOTIFICATION
    await Notification.create({
      student: application.student._id,
      title: notificationTitle,
      message: notificationMessage,
      roundName: application.roundName || null,
      roundDate: application.roundDate || null,
      roundTime: application.roundTime || null,
      instructions: application.instructions || null
    });

    res.json({ message: "Status updated successfully", application });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.applyJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    /* find job */

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const today = new Date();

    /* check deadline */

    if (job.deadline && today > job.deadline) {
      return res.status(400).json({ message: "Application deadline over" });
    }

    /* check duplicate application */

    const existing = await Application.findOne({
      student: req.user.id,
      job: jobId
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      student: req.user.id,
      job: jobId,
      resume: req.file ? req.file.path : null
    });

    res.json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {

    const apps = await Application.find({ student: req.user.id })
      .populate("job");

    res.json(apps);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {

    const apps = await Application.find()
      .populate("student", "-password")
      .populate("job");

    res.json(apps);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

