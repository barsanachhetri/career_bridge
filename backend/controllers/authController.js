const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  try {
    const { name, email, password, branch, cgpa, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let tier = null;

    if (role === "student") {

      if (cgpa >= 8) {
        tier = 1;
      }
      else if (cgpa >= 7) {
        tier = 2;
      }
      else {
        tier = 3;
      }

    }


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      branch,
      cgpa,
      role,
      tier
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }



    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;

    await user.save();

    res.json({
      message: "Password updated"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, branch, cgpa, skills } = req.body;
    const userId = req.user.id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Calculate tier based on cgpa
    let updateData = { name, email, branch, cgpa, skills };

    if (cgpa) {
      if (cgpa >= 8) {
        updateData.tier = 1;
      } else if (cgpa >= 7) {
        updateData.tier = 2;
      } else {
        updateData.tier = 3;
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};