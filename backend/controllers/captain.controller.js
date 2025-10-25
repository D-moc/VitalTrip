import Captain from "../models/captain.model.js";
import User from "../models/user.model.js";
import Trip from "../models/trip.model.js";
import ResetToken from "../models/resetToken.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { sendResetEmail } from "../utils/mailer.js";


export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password, accessKey } = req.body;

  try {
    if (accessKey !== process.env.CAPTAIN_ACCESS_KEY)
      return res.status(403).json({ message: "Invalid Access Key" });

    const existing = await Captain.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Captain already exists" });

    const hashed = await Captain.hashPassword(password);
    const captain = await Captain.create({ fullname, email, password: hashed });

    const token = captain.generateAuthToken();

    res.status(201).json({
      message: "Captain registered successfully",
      token,
      role: "captain",
      captain,
    });
  } catch (err) {
    console.error("Register Captain error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};


export const loginCaptain = async (req, res) => {
  const { email, password } = req.body;

  try {
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await captain.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = captain.generateAuthToken();
    res.status(200).json({
      message: "Login successful ",
      token,
      role: "captain",
      captain,
    });
  } catch (err) {
    console.error("Captain Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

//auth required
export const getCaptainProfile = async (req, res) => {
  try {
    const captain = await Captain.findById(req.user?._id).select("-password");
    if (!captain)
      return res.status(404).json({ message: "Captain not found" });

    res.status(200).json({ captain });
  } catch (err) {
    console.error("Error fetching captain profile:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateCaptainProfile = async (req, res) => {
  try {
    const captainId = req.user?._id;
    if (!captainId)
      return res.status(401).json({ message: "Unauthorized access" });

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

    const updatedCaptain = await Captain.findByIdAndUpdate(captainId, updates, {
      new: true,
      select: "-password",
    });

    if (!updatedCaptain)
      return res.status(404).json({ message: "Captain not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      captain: updatedCaptain,
    });
  } catch (err) {
    console.error("Update captain profile error:", err);
    res.status(500).json({ message: "Error updating captain profile" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const captain = await Captain.findOne({ email });
    if (!captain)
      return res.status(404).json({ message: "Admin not found" });

    // Remove previous reset tokens
    await ResetToken.deleteMany({
      userId: captain._id,
      userModelType: "Captain",
    });

    // Generate new token
    const token = crypto.randomBytes(32).toString("hex");
    await ResetToken.create({
      userId: captain._id,
      userModelType: "Captain",
      token,
    });

    const resetLink = `${process.env.FRONTEND_URL}/captain/reset-password/${token}`;
    await sendResetEmail(captain.email, resetLink);

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password (Captain) error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetToken = await ResetToken.findOne({
      token,
      userModelType: "Captain",
    });
    if (!resetToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    const captain = await Captain.findById(resetToken.userId);
    if (!captain)
      return res.status(404).json({ message: "Admin not found" });

    captain.password = await bcrypt.hash(newPassword, 10);
    await captain.save();
    await resetToken.deleteOne();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

export const logoutCaptain = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) await blacklistTokenModel.create({ token });
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout error" });
  }
};

export const getAllUsersAndTrips = async (req, res) => {
  try {
    const users = await User.find().select("fullname email profileImage createdAt");
    const trips = await Trip.find()
      .populate("user", "fullname email profileImage")
      .sort({ tripDate: -1 });

    res.status(200).json({
      success: true,
      users,
      trips,
    });
  } catch (err) {
    console.error("Captain Dashboard error (users + trips):", err);
    res.status(500).json({ success: false, message: "Error fetching user/trip data" });
  }
};

export const getUpcomingTrips = async (req, res) => {
  try {
    const upcomingTrips = await Trip.find({
      tripDate: { $gte: new Date() },
    })
      .populate("user", "fullname email profileImage")
      .sort({ tripDate: 1 });

    res.status(200).json({
      success: true,
      count: upcomingTrips.length,
      upcomingTrips,
    });
  } catch (err) {
    console.error("Captain Dashboard error (upcoming trips):", err);
    res.status(500).json({ success: false, message: "Error fetching upcoming trips" });
  }
};
