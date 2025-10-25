// controllers/tripGuide.controller.js
import Destination from "../models/destination.model.js";
import { geocodeLocation } from "../utils/geocode.service.js";
import { getRoute } from "../utils/route.service.js";
import { getNearbyPlaces } from "../utils/nearby.service.js";

/**
 * Generates a full trip guide between two destinations.
 * Example: /api/trips/guide?from=Mumbai&to=Pune
 */
export const getTripGuide = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to)
      return res.status(400).json({ message: "From and To destinations required" });

    // 1️⃣ Try to find saved destinations first
    let fromDest = await Destination.findOne({ name: new RegExp(from, "i") });
    let toDest = await Destination.findOne({ name: new RegExp(to, "i") });

    // 2️⃣ If not found, geocode directly
    if (!fromDest) {
      const coords = await geocodeLocation(from);
      fromDest = { name: from, coordinates: coords };
    }
    if (!toDest) {
      const coords = await geocodeLocation(to);
      toDest = { name: to, coordinates: coords };
    }

    // 3️⃣ Get route info
    const route = await getRoute(fromDest.coordinates, toDest.coordinates);
    if (!route) return res.status(500).json({ message: "Failed to get route info" });

    // 4️⃣ Get nearby places near destination
    const nearby = await getNearbyPlaces(
      toDest.coordinates.lat,
      toDest.coordinates.lng
    );

    res.json({
      success: true,
      from: fromDest.name,
      to: toDest.name,
      distance_km: route.distance_km,
      duration_hr: route.duration_hr,
      nearby_places: nearby,
      route_geometry: route.geometry,
    });
  } catch (err) {
    console.error("❌ Trip guide error:", err);
    res.status(500).json({ message: "Server error generating trip guide" });
  }
};
