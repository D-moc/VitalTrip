import express from "express";
import { body } from "express-validator";
import upload from "../middlewares/upload.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";


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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  loginCaptain
);


router.get("/profile", verifyCaptainAccess, getCaptainProfile);


router.put(
  "/update-profile",
  verifyCaptainAccess,
  upload.single("profileImage"),
  updateCaptainProfile
);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.post("/logout", verifyCaptainAccess, logoutCaptain);



router.get("/dashboard/users", verifyCaptainAccess, getAllUsers);


router.get("/dashboard/destinations", verifyCaptainAccess, getAllDestinations);


router.get("/dashboard/trips", verifyCaptainAccess, getAllTrips);


router.get("/dashboard/bookings", verifyCaptainAccess, getAllBookings);


router.get("/dashboard/payments", verifyCaptainAccess, getAllPayments);


router.get(
  "/dashboard/bookings/pending",
  verifyCaptainAccess,
  getPendingVerificationBookings
);


router.put(
  "/dashboard/bookings/verify/:id",
  verifyCaptainAccess,
  markBookingVerified
);


router.put(
  "/dashboard/payments/verify/:paymentId",
  verifyCaptainAccess,
  verifyPayment
);


router.get(
  "/dashboard/users-trips",
  verifyCaptainAccess,
  getAllUsersAndTrips
);


router.get(
  "/dashboard/upcoming-trips",
  verifyCaptainAccess,
  getUpcomingTrips
);


router.delete("/dashboard/users/:id", verifyCaptainAccess, deleteUser);
router.delete("/dashboard/trips/:id", verifyCaptainAccess, deleteTrip);
router.delete("/dashboard/bookings/:id", verifyCaptainAccess, deleteBooking);

export default router;
