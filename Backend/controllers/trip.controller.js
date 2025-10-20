// // controllers/trip.controller.js
// const Trip = require("../models/trip.model");

// exports.createTrip = async (req, res) => {
//   try {
//     const { destination, days, travellers, budget, transport, stay, itinerary } = req.body;
//     const userId = req.user._id;

//     const newTrip = await Trip.create({
//       userId,
//       destination,
//       days,
//       travellers,
//       budget,
//       transport,
//       stay,
//       itinerary,
//     });

//     res.status(201).json({ message: "Trip created successfully", trip: newTrip });
//   } catch (err) {
//     console.error("Error creating trip:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getUserTrips = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ trips });
//   } catch (err) {
//     console.error("Error fetching trips:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// controllers/trip.controller.js
const Trip = require("../models/trip.model");

// ➕ Create Trip
exports.createTrip = async (req, res) => {
  try {
    // user is added by authUser middleware
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const {
      destination,
      days,
      travellers,
      budget,
      transport,
      stay,
      itinerary,
    } = req.body;

    // convert itinerary array to string (if frontend sends it as array)
    const formattedItinerary = Array.isArray(itinerary)
      ? itinerary.join(", ")
      : itinerary;

    const newTrip = await Trip.create({
      user: userId,
      destination,
      days,
      travellers,
      budget,
      transport,
      stay,
      itinerary: formattedItinerary,
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully ✅",
      trip: newTrip,
    });
  } catch (err) {
    console.error("Error creating trip:", err);
    res.status(500).json({
      success: false,
      message: "Server error while creating trip",
      error: err.message,
    });
  }
};

// 📜 Get all trips of logged-in user
exports.getUserTrips = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching trips",
      error: err.message,
    });
  }
};
