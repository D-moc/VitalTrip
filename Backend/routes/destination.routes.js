import express from "express";
import {
  searchDestinations,
  getCategories,
  getByCategory,
  addDestination,
  updateDestination,
  getAllDestinations,
  getDestinationById,
} from "../controllers/destination.controller.js";
import { verifyCaptainAccess } from "../middlewares/roleAuth.middleware.js";

const router = express.Router();

// 🧭 Get all destinations (Public)
router.get("/", getAllDestinations);

// 🔍 Search destinations by name/location/category (Public)
router.get("/search", searchDestinations);

// 🗂️ Get all unique categories (Public)
router.get("/categories", getCategories);

// 🗺️ Get destinations by category (Public)
router.get("/category/:category", getByCategory);

// 📍 Get single destination by ID (Public)
router.get("/:id", getDestinationById);

// ➕ Add new destination (Captain-only)
router.post("/add", verifyCaptainAccess, addDestination);

// ✏️ Update destination (Captain-only)
router.put("/:id", verifyCaptainAccess, updateDestination);

export default router;
