const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    branch: String,
    cgpa: Number,
    tier: {
      type: Number
    },
    skills: [String],
    resume: String,
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },
    placed: {
      type: Boolean,
      default: false
    },
    company: String,
    package: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);