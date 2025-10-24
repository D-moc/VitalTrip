// routes/tripGuide.routes.js
import express from "express";
import { getTripGuide } from "../controllers/tripGuide.controller.js";
const router = express.Router();

// Public endpoint — generate route + nearby data
router.get("/guide", getTripGuide);

export default router;
