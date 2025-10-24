// import mongoose from "mongoose";

// const tripSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     destination: { type: String, required: true },
//     destinationCoords: { lat: Number, lng: Number }, // optional
//     originCoords: { lat: Number, lng: Number },      // optional
//     days: Number,
//     travellers: Number,
//     budget: Number,
//     transport: String,
//     stay: String,
//     itinerary: String,
//     status: { type: String, default: "planned" },

    
//     routeSummary: {
//       distance_meters: Number,
//       duration_seconds: Number,
//       geometry: { type: Object }, // GeoJSON or ORS polyline/coordinates
//       steps: { type: Array },     // optional array of step objects
//       createdAt: Date,
//         tripDate: { type: Date, default: Date.now },
//     },
//   },
//   { timestamps: true }
  
// );


// export default mongoose.model("Trip", tripSchema);

import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    destinationCoords: { lat: Number, lng: Number }, // optional
    originCoords: { lat: Number, lng: Number }, // optional
    days: Number,
    travellers: Number,
    budget: Number,
    transport: String,
    stay: String,
    itinerary: String,
    status: { type: String, default: "planned" },

    // ✅ Move tripDate here, not in routeSummary
    tripDate: { type: Date, default: Date.now },

    routeSummary: {
      distance_meters: Number,
      duration_seconds: Number,
      geometry: { type: Object }, // GeoJSON or ORS polyline/coordinates
      steps: { type: Array },
      createdAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
