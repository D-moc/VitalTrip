import express from "express";
import {
  createTrip,
  getUserTrips,
  cancelTrip,
  getAllTrips,
} from "../controllers/trip.controller.js";

import {
  computeRoute,
  computeAndSaveRouteForTrip,
} from "../controllers/route.controller.js";

import { authUser } from "../middlewares/auth.middleware.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* ✈️ USER TRIP ROUTES */
/* -------------------------------------------------------------------------- */

// ➕ Create a new trip
router.post("/create", authUser, createTrip);

// 🧾 Get all trips of logged-in user
router.get("/my-trips", authUser, getUserTrips);

// ❌ Cancel a specific trip
router.put("/cancel/:id", authUser, cancelTrip);

// 🗺️ Compute a route dynamically (return real route data + POIs)
router.post("/route", authUser, computeRoute);

// 💾 Compute and store route details permanently in DB for that trip
router.post("/:id/route-cache", authUser, computeAndSaveRouteForTrip);

/* -------------------------------------------------------------------------- */
/* 🧭 CAPTAIN (ADMIN) ROUTES */
/* -------------------------------------------------------------------------- */

// 🧾 Get all trips (Admin/Captain only)
router.get("/all", verifyCaptainAccess, getAllTrips);

export default router;
