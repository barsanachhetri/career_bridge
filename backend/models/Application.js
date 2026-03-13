const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    resume: {
        type: String
    },

    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Selected", "Rejected", "Placed"],
        default: "Applied"
    },

    roundNumber: {
        type: Number,
        default: 0
    },

    roundName: String,
    roundDate: String,
    roundTime: String,
    instructions: String,

    roundHistory: [{
        roundNumber: Number,
        roundName: String,
        roundDate: String,
        roundTime: String,
        instructions: String,
        completedAt: { type: Date, default: Date.now }
    }],

    package: String,
    company: String

}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);