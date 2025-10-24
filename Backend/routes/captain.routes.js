import express from "express";
import { body } from "express-validator";
import upload from "../middlewares/upload.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

// 🧭 Captain Auth & Profile Controllers
import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  updateCaptainProfile,
  forgotPassword,
  resetPassword,
  logoutCaptain,
  getAllUsersAndTrips,
  getUpcomingTrips,
} from "../controllers/captain.controller.js";

// 📊 Dashboard (Admin) Controllers
import {
  getAllUsers,
  getAllDestinations,
  getAllTrips,
  getAllPayments,
  getAllBookings,
  getPendingVerificationBookings,
  markBookingVerified,
  verifyPayment,
  deleteUser,
  deleteTrip,
  deleteBooking,
} from "../controllers/captainDashboard.controller.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* 🧭 REGISTER CAPTAIN (Access Key Protected) */
/* -------------------------------------------------------------------------- */
router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  registerCaptain
);

/* -------------------------------------------------------------------------- */
/* 🔑 LOGIN CAPTAIN */
/* -------------------------------------------------------------------------- */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  loginCaptain
);

/* -------------------------------------------------------------------------- */
/* 👤 CAPTAIN PROFILE ROUTES */
/* -------------------------------------------------------------------------- */

// Get captain profile
router.get("/profile", verifyCaptainAccess, getCaptainProfile);

// Update captain profile (with image upload)
router.put(
  "/update-profile",
  verifyCaptainAccess,
  upload.single("profileImage"),
  updateCaptainProfile
);

/* -------------------------------------------------------------------------- */
/* 📨 PASSWORD MANAGEMENT */
/* -------------------------------------------------------------------------- */
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

/* -------------------------------------------------------------------------- */
/* 🚪 LOGOUT CAPTAIN */
/* -------------------------------------------------------------------------- */
router.post("/logout", verifyCaptainAccess, logoutCaptain);

/* -------------------------------------------------------------------------- */
/* 📊 CAPTAIN DASHBOARD ROUTES */
/* -------------------------------------------------------------------------- */

// 👥 All Users
router.get("/dashboard/users", verifyCaptainAccess, getAllUsers);

// 🌍 All Destinations
router.get("/dashboard/destinations", verifyCaptainAccess, getAllDestinations);

// 🧳 All Trips
router.get("/dashboard/trips", verifyCaptainAccess, getAllTrips);

// 📅 All Bookings
router.get("/dashboard/bookings", verifyCaptainAccess, getAllBookings);

// 💰 All Payments
router.get("/dashboard/payments", verifyCaptainAccess, getAllPayments);

// 🟠 Pending Verification Bookings
router.get(
  "/dashboard/bookings/pending",
  verifyCaptainAccess,
  getPendingVerificationBookings
);

// ✅ Verify Booking (Captain approval)
router.put(
  "/dashboard/bookings/verify/:id",
  verifyCaptainAccess,
  markBookingVerified
);

// ✅ Verify Payment (Captain approval)
router.put(
  "/dashboard/payments/verify/:paymentId",
  verifyCaptainAccess,
  verifyPayment
);

// 🧭 NEW: View all Users with Their Planned Trips
router.get(
  "/dashboard/users-trips",
  verifyCaptainAccess,
  getAllUsersAndTrips
);

// 🧭 NEW: View only Upcoming Trips
router.get(
  "/dashboard/upcoming-trips",
  verifyCaptainAccess,
  getUpcomingTrips
);

/* -------------------------------------------------------------------------- */
/* 🗑️ DELETE ROUTES (Captain privileges) */
/* -------------------------------------------------------------------------- */
router.delete("/dashboard/users/:id", verifyCaptainAccess, deleteUser);
router.delete("/dashboard/trips/:id", verifyCaptainAccess, deleteTrip);
router.delete("/dashboard/bookings/:id", verifyCaptainAccess, deleteBooking);

export default router;
