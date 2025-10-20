// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const cookieParser = require('cookie-parser');
// const connectDB = require('./db/db');
// const userRoutes = require('./routes/user.routes');
// const captainRoutes = require('./routes/captain.routes');

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });    

// app.use('/users', userRoutes);
// app.use('/captains', captainRoutes);



// module.exports = app;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const path = require("path");




dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const destinationRoutes = require("./routes/destination.routes");
const tripRoutes = require("./routes/trip.routes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/captains", captainRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/trips", tripRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("🚀 VitalTrip Backend Running Successfully!");
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

module.exports = app;
