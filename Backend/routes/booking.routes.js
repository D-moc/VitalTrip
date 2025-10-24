// // // // routes/booking.routes.js
// // // import express from "express";
// // // import { authUser } from "../middlewares/auth.middleware.js";
// // // import {
// // //   createBooking,
// // //   getUserBookings,
// // //   cancelBooking,
// // // } from "../controllers/booking.controller.js";

// // // const router = express.Router();

// // // // ➕ Create new booking
// // // router.post("/create", authUser, createBooking);

// // // // 📜 Get bookings for logged-in user
// // // router.get("/my-bookings", authUser, getUserBookings);

// // // // 🔁 Added alias for frontend compatibility
// // // router.get("/user", authUser, getUserBookings);

// // // // ❌ Cancel booking
// // // router.put("/cancel/:id", authUser, cancelBooking);

// // // export default router;


// // // routes/booking.routes.js (update)
// // import express from "express";
// // import { authUser } from "../middlewares/auth.middleware.js";
// // import {
// //   createBooking,
// //   getUserBookings,
// //   cancelBooking,
// //   confirmBookingPayment,
// // } from "../controllers/booking.controller.js";

// // const router = express.Router();

// // router.post("/create", authUser, createBooking);
// // router.get("/my-bookings", authUser, getUserBookings);
// // router.get("/user", authUser, getUserBookings);
// // router.put("/cancel/:id", authUser, cancelBooking);

// // // New: confirm payment endpoint
// // router.post("/confirm/:id", authUser, confirmBookingPayment);

// // export default router;


// // routes/booking.routes.js
// import express from "express";
// import { authUser } from "../middlewares/auth.middleware.js";
// import {
//   createBooking,
//   getUserBookings,
//   cancelBooking,
//   confirmBookingPayment,
// } from "../controllers/booking.controller.js";

// const router = express.Router();

// router.post("/create", authUser, createBooking);
// router.get("/my-bookings", authUser, getUserBookings);
// router.put("/cancel/:id", authUser, cancelBooking);
// router.post("/confirm/:id", authUser, confirmBookingPayment);

// export default router;


import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  confirmBookingPayment,   // ✅ Add this import
} from "../controllers/booking.controller.js";

const router = express.Router();

// ➕ Create new booking
router.post("/create", authUser, createBooking);

// 📜 Get bookings for logged-in user
router.get("/my-bookings", authUser, getUserBookings);

// ❌ Cancel booking
router.put("/cancel/:id", authUser, cancelBooking);

// ✅ Confirm booking payment (manual step)
router.post("/confirm/:id", authUser, confirmBookingPayment);

export default router;
