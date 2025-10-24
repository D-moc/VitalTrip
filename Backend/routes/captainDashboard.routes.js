// // routes/captainDashboard.routes.js
// import express from "express";
// import {
//   getAllUsers,
//   getAllDestinations,
//   getAllTrips,
//   getAllPayments,
//   getAllBookings,
//   verifyPayment,
//   deleteUser,
//   deleteTrip,
//   deleteBooking,
// } from "../controllers/captainDashboard.controller.js";
// import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

// const router = express.Router();

// /** 🧾 DASHBOARD ROUTES (Captain Only) */

// // 👥 Users
// router.get("/users", verifyCaptainAccess, getAllUsers);
// router.delete("/users/:id", verifyCaptainAccess, deleteUser);

// // 🌍 Destinations
// router.get("/destinations", verifyCaptainAccess, getAllDestinations);

// // 🧳 Trips
// router.get("/trips", verifyCaptainAccess, getAllTrips);
// router.delete("/trips/:id", verifyCaptainAccess, deleteTrip);

// // 📅 Bookings
// router.get("/bookings", verifyCaptainAccess, getAllBookings);
// router.delete("/bookings/:id", verifyCaptainAccess, deleteBooking);

// // 💰 Payments
// router.get("/payments", verifyCaptainAccess, getAllPayments);
// router.put("/payments/verify/:paymentId", verifyCaptainAccess, verifyPayment);

// export default router;


// routes/captainDashboard.routes.js
import express from "express";
import {
  getAllUsers,
  getAllDestinations,
  getAllTrips,
  getAllPayments,
  getAllBookings,
  verifyPayment,
  deleteUser,
  deleteTrip,
  deleteBooking,
  getPendingVerificationBookings, // ✅ new
  markBookingVerified, // ✅ new
} from "../controllers/captainDashboard.controller.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();

/** 🧾 DASHBOARD ROUTES (Captain Only) */

// 👥 Users
router.get("/users", verifyCaptainAccess, getAllUsers);
router.delete("/users/:id", verifyCaptainAccess, deleteUser);

// 🌍 Destinations
router.get("/destinations", verifyCaptainAccess, getAllDestinations);

// 🧳 Trips
router.get("/trips", verifyCaptainAccess, getAllTrips);
router.delete("/trips/:id", verifyCaptainAccess, deleteTrip);

// 📅 Bookings
router.get("/bookings", verifyCaptainAccess, getAllBookings);
router.delete("/bookings/:id", verifyCaptainAccess, deleteBooking);

// 💰 Payments
router.get("/payments", verifyCaptainAccess, getAllPayments);
router.put("/payments/verify/:paymentId", verifyCaptainAccess, verifyPayment);

// 🟠 Pending verification bookings
router.get("/bookings/pending", verifyCaptainAccess, getPendingVerificationBookings);
router.put("/bookings/verify/:id", verifyCaptainAccess, markBookingVerified);

export default router;
