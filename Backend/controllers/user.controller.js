import User from "../models/user.model.js";
import ResetToken from "../models/resetToken.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { sendResetEmail } from "../utils/mailer.js";


export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const hashed = await User.hashPassword(password);
    const user = await User.create({
      fullname,
      email,
      password: hashed,
    });

    const token = user.generateAuthToken();
    res.status(201).json({
      message: "User registered successfully",
      token,
      role: "user",
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).json({
      message: "Login successful",
      token,
      role: "user",
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.body["fullname.firstname"] || req.body["fullname.lastname"]) {
      updates.fullname = {
        firstname: req.body["fullname.firstname"],
        lastname: req.body["fullname.lastname"],
      };
      delete updates["fullname.firstname"];
      delete updates["fullname.lastname"];
    }

    if (req.file) {
      updates.profileImage = `uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
};


export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const imageUrl = `uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl,
      user,
    });
  } catch (err) {
    console.error("Upload image error:", err);
    res.status(500).json({ message: "Error uploading profile image" });
  }
};


export const updateUserCredentials = async (req, res) => {
  try {
    const { newEmail, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    if (newEmail) user.email = newEmail;
    if (newPassword) user.password = await User.hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: "Credentials updated successfully", user });
  } catch (err) {
    console.error("Update credentials error:", err);
    res.status(500).json({ message: "Error updating user credentials" });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    await ResetToken.deleteMany({ userId: user._id, userModelType: "user" });

    const token = crypto.randomBytes(32).toString("hex");
    await ResetToken.create({
      userId: user._id,
      userModelType: "user",
      token,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetToken = await ResetToken.findOne({
      token,
      userModelType: "user",
    });
    if (!resetToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = await User.findById(resetToken.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    await resetToken.deleteOne();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Error resetting password" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await blacklistTokenModel.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout error" });
  }
};
