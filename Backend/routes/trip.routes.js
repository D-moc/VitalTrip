const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip.controller");
const { authUser } = require("../middlewares/auth.middlewares");

// ➕ Create Trip
router.post("/create", authUser, tripController.createTrip);

// 🧾 Get User Trips
router.get("/my-trips", authUser, tripController.getUserTrips);

module.exports = router;
