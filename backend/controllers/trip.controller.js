import Trip from "../models/trip.model.js";
import User from "../models/user.model.js";

// ➕ Create Trip (User only)
export const createTrip = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { destination, days, travellers, budget, transport, stay, itinerary } = req.body;
    const trip = await Trip.create({
      user: userId,
      destination,
      days,
      travellers,
      budget,
      transport,
      stay,
      itinerary: Array.isArray(itinerary) ? itinerary.join(", ") : itinerary,
    });

    res.status(201).json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ message: "Server error creating trip", error: err.message });
  }
};

// 📜 Get User Trips
export const getUserTrips = async (req, res) => {
  try {
    const userId = req.user._id;
    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user trips" });
  }
};

// 🧾 Captain: Get All Trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("user", "fullname email");
    res.status(200).json({ success: true, count: trips.length, trips });
  } catch (err) {
    res.status(500).json({ message: "Error fetching all trips" });
  }
};

// ❌ Cancel Trip (User)
export const cancelTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    trip.status = "cancelled";
    await trip.save();
    res.json({ message: "Trip cancelled successfully", trip });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling trip" });
  }
};
