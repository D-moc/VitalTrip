import express from "express";
import { body } from "express-validator";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

// 🧩 Controllers
import {
  registerUser,
  loginUser,
  getUserProfile,
  uploadProfileImage,
  updateUserCredentials,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../controllers/user.controller.js";

import {
  getUserDashboard,
  updateUserProfile,
  cancelUserTrip,
} from "../controllers/userDashboard.controller.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🧭 AUTHENTICATION ROUTES */
/* -------------------------------------------------------------------------- */

// 🔹 Register User
router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

// 🔹 Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

// 🔹 Logout User
router.post("/logout", authUser, logoutUser);

/* -------------------------------------------------------------------------- */
/* 👤 PROFILE & ACCOUNT MANAGEMENT */
/* -------------------------------------------------------------------------- */

// 🔹 Get Logged-In User Profile
router.get("/profile", authUser, getUserProfile);

// 🔹 Upload Profile Image
router.post(
  "/upload-profile",
  authUser,
  upload.single("profileImage"),
  uploadProfileImage
);

// 🔹 Update Email / Password (Credentials)
router.put("/update-credentials", authUser, updateUserCredentials);

// 🔹 Update Full Profile (Name, Email, Image, etc.)
router.put(
  "/update-profile",
  authUser,
  upload.single("profileImage"),
  updateUserProfile
);

/* -------------------------------------------------------------------------- */
/* 🧭 USER DASHBOARD ROUTES */
/* -------------------------------------------------------------------------- */

// 🔹 Dashboard Overview (Trips, Stats, Recent Activity)
router.get("/dashboard", authUser, getUserDashboard);

// 🔹 Cancel a Trip
router.delete("/cancel-trip/:id", authUser, cancelUserTrip);

/* -------------------------------------------------------------------------- */
/* 🔑 PASSWORD MANAGEMENT */
/* -------------------------------------------------------------------------- */

// 🔹 Forgot Password (send reset link or OTP)
router.post("/forgot-password", forgotPassword);

// 🔹 Reset Password (after OTP or link)
router.post("/reset-password", resetPassword);

export default router;
