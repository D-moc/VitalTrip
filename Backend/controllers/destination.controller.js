import Destination from "../models/destination.model.js";
import { geocodeLocation } from "../utils/geocode.service.js";

/* -------------------------------------------------------------------------- */
/* 🔍 Search Destinations */
/* -------------------------------------------------------------------------- */
export const searchDestinations = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query)
      return res.status(400).json({ message: "Search query required" });

    const results = await Destination.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    if (!results.length)
      return res.status(404).json({ message: "No destinations found" });

    res.json({ count: results.length, results });
  } catch (err) {
    console.error("❌ Search error:", err);
    res
      .status(500)
      .json({ message: "Server error while searching destinations" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🗂️ Get All Categories */
/* -------------------------------------------------------------------------- */
export const getCategories = async (req, res) => {
  try {
    const categories = await Destination.distinct("category");
    res.json({ count: categories.length, categories });
  } catch (err) {
    console.error("❌ Category fetch error:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🏝️ Get By Category */
/* -------------------------------------------------------------------------- */
export const getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const results = await Destination.find({ category });
    if (!results.length)
      return res
        .status(404)
        .json({ message: "No destinations found for this category" });

    res.json({ count: results.length, results });
  } catch (err) {
    console.error("❌ getByCategory error:", err);
    res.status(500).json({ message: "Server error fetching category" });
  }
};

/* -------------------------------------------------------------------------- */
/* ➕ Add Destination (Captain only) */
/* -------------------------------------------------------------------------- */
export const addDestination = async (req, res) => {
  try {
    const {
      name,
      location,
      category,
      description,
      bestTimeToVisit,
      accessibility,
      budget,
      image,
    } = req.body;

    if (!name || !location || !category)
      return res
        .status(400)
        .json({ message: "Name, location & category are required" });

    // 🧭 Optional geocoding (handles errors gracefully)
    let coordinates = {};
    try {
      coordinates = await geocodeLocation(`${name}, ${location}`);
    } catch (geoErr) {
      console.warn("⚠️ Geocoding failed:", geoErr.message);
      coordinates = { lat: 0, lng: 0 };
    }

    const newDest = await Destination.create({
      name,
      location,
      category,
      description,
      bestTimeToVisit,
      accessibility,
      budget,
      image,
      coordinates,
    });

    res.status(201).json({
      success: true,
      message: "Destination added successfully",
      destination: newDest,
    });
  } catch (err) {
    console.error("❌ Add destination error:", err);
    res
      .status(500)
      .json({ message: "Server error adding destination", error: err.message });
  }
};

/* -------------------------------------------------------------------------- */
/* ✏️ Update Destination */
/* -------------------------------------------------------------------------- */
export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Destination.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Destination not found" });
    res.json({ message: "Destination updated successfully", updated });
  } catch (err) {
    console.error("❌ Update destination error:", err);
    res.status(500).json({ message: "Error updating destination" });
  }
};

/* -------------------------------------------------------------------------- */
/* 📍 Get Destination By ID */
/* -------------------------------------------------------------------------- */
export const getDestinationById = async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest)
      return res.status(404).json({ message: "Destination not found" });
    res.json(dest);
  } catch (err) {
    console.error("❌ Get destination by ID error:", err);
    res.status(500).json({ message: "Error fetching destination" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🌍 Get All Destinations */
/* -------------------------------------------------------------------------- */
export const getAllDestinations = async (req, res) => {
  try {
    console.log("🧭 Fetching all destinations...");
    const destinations = await Destination.find();
    console.log("✅ Found destinations:", destinations.length);

    if (!destinations.length)
      return res
        .status(404)
        .json({ message: "No destinations found in database" });

    res.json({ count: destinations.length, destinations });
  } catch (err) {
    console.error("❌ Failed to fetch destinations:", err);
    res.status(500).json({
      message: "Failed to fetch destinations",
      error: err.message,
    });
  }
};
