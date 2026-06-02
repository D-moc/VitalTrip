// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { connectDB } from "./db/db.js";
// import { errorHandler } from "./middlewares/error.middleware.js";

// dotenv.config();
// connectDB();

// const app = express();

// /* 🔥 FORCE CORS (VERCEL FIX) */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,DELETE,OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   // 🔥 handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// /* 🔥 OPTIONAL CORS */
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// /* Prevent favicon error */
// app.get("/favicon.ico", (req, res) => res.status(204).end());

// /* Static uploads */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* Routes */
// import userRoutes from "./routes/user.routes.js";
// import captainRoutes from "./routes/captain.routes.js";
// import tripRoutes from "./routes/trip.routes.js";
// import destinationRoutes from "./routes/destination.routes.js";
// import bookingRoutes from "./routes/booking.routes.js";
// import paymentRoutes from "./routes/payment.routes.js";
// import tripGuideRoutes from "./routes/tripGuide.routes.js";
// import blogRoutes from "./routes/blog.routes.js";
// import aiRoutes from "./routes/ai.routes.js";
// import routeRoutes from "./routes/route.routes.js";

// app.use("/api/users", userRoutes);
// app.use("/api/captains", captainRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/trips", tripRoutes);
// app.use("/api/trip-guides", tripGuideRoutes);
// app.use("/api/routes", routeRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/ai", aiRoutes);

// /* Health check */
// app.get("/", (req, res) => {
//   res.status(200).send("VitalTrip Backend Running Successfully!");
// });

// /* 404 handler */
// app.use((req, res, next) => {
//   const error = new Error("Route not found");
//   error.statusCode = 404;
//   next(error);
// });

// /* Error handler */
// app.use(errorHandler);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./db/db.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/* Prevent favicon error */
app.get("/favicon.ico", (req, res) => res.status(204).end());

/* Static uploads */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Routes */
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import destinationRoutes from "./routes/destination.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import tripGuideRoutes from "./routes/tripGuide.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import routeRoutes from "./routes/route.routes.js";

app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trip-guides", tripGuideRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.status(200).send("VitalTrip Backend Running Successfully!");
});

/* 404 handler */
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

/* Error handler */
app.use(errorHandler);

export default app;