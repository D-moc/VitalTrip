// const mongoose = require("mongoose");

// const tripSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     destination: { type: String, required: true },
//     days: { type: Number, required: true },
//     travellers: { type: Number, required: true },
//     budget: { type: Number },
//     transport: { type: String },
//     stay: { type: String },
//     itinerary: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Trip", tripSchema);


// models/trip.model.js
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
    },
    days: {
      type: Number,
      required: [true, "Number of days is required"],
    },
    travellers: {
      type: Number,
      required: [true, "Number of travellers is required"],
    },
    budget: {
      type: Number,
      default: 0,
    },
    transport: {
      type: String,
      default: "Not specified",
    },
    stay: {
      type: String,
      default: "Not specified",
    },
    itinerary: {
      type: String, // stored as comma-separated string
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
