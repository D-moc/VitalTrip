// controllers/destination.controller.js
const Destination = require("../models/destination.model");

// 🔍 Search Destinations by name or location
exports.searchDestinations = async (req, res) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Match name OR location (case-insensitive)
    const results = await Destination.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No destinations found." });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error("❌ Error searching destinations:", error);
    res.status(500).json({ message: "Server error while searching destinations." });
  }
};

// ➕ Add New Destination
exports.addDestination = async (req, res) => {
  try {
    const { name, location, description, bestTimeToVisit, accessibility, budget, routes, nearbyHospitals, image } =
      req.body;

    if (!name || !location || !description) {
      return res.status(400).json({ message: "Name, location, and description are required." });
    }

    const newDestination = new Destination({
      name,
      location,
      description,
      bestTimeToVisit,
      accessibility,
      budget,
      routes,
      nearbyHospitals,
      image,
    });

    await newDestination.save();
    res.status(201).json({
      message: "Destination added successfully!",
      destination: newDestination,
    });
  } catch (error) {
    console.error("❌ Error adding destination:", error);
    res.status(500).json({ message: "Server error while adding destination." });
  }
};

// 🗺️ Get Destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }

    res.status(200).json({ destination });
  } catch (error) {
    console.error("❌ Error fetching destination:", error);
    res.status(500).json({ message: "Server error fetching destination." });
  }
};

