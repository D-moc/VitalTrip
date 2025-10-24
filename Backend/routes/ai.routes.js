// // routes/ai.routes.js
// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// /**
//  * Generate AI-based Trip Itinerary using Groq API
//  * Input: destination, startLocation, days, travellers, budget, preferences, accommodation, transport
//  */
// router.post("/itinerary", async (req, res) => {
//   try {
//     const {
//       destination,
//       startLocation,
//       days,
//       travellers,
//       budget,
//       preferences,
//       accommodation,
//       transport,
//     } = req.body;

//     // 🧠 Validate input
//     if (
//       !destination ||
//       !startLocation ||
//       !days ||
//       !travellers ||
//       !budget ||
//       !preferences ||
//       !accommodation ||
//       !transport
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required!" });
//     }

//     // ✨ Prompt for AI
//     const prompt = `
// You are a travel planner for Maharashtra Tourism. 
// Create a detailed ${days}-day itinerary for ${destination} starting from ${startLocation}.
// Include:
// - Daily schedule (Morning, Afternoon, Evening)
// - Route overview with approximate travel distance
// - Recommended attractions and food spots
// - Nearby hospitals, hotels, and police stations
// - Accommodation and transport suggestions
// - Cost estimation (within ₹${budget})
// - Tailor recommendations to ${travellers} traveller(s) interested in ${preferences}.
// Make it structured as:

// Day 1:
// Morning -
// Afternoon -
// Evening -

// Day 2:
// ...

// End with a short summary and safety tips.
// `;

//     // 🌍 Groq API request
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.1-8b-instant",
//         messages: [
//           { role: "system", content: "You are an expert Indian travel planner." },
//           { role: "user", content: prompt },
//         ],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const itineraryText = response.data.choices[0].message.content;

//     res.json({
//       success: true,
//       itinerary: itineraryText,
//     });
//   } catch (error) {
//     console.error("Groq AI Error:", error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: "AI itinerary generation failed.",
//       error: error.message,
//     });
//   }
// });

// export default router;

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/itinerary", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 10) {
      return res.status(400).json({ error: "Prompt is too short or missing." });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Indian travel planner who creates multi-day itineraries with places, travel times, and recommendations.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText =
      response.data.choices?.[0]?.message?.content?.trim() ||
      "AI could not generate an itinerary.";

    res.status(200).json({ itinerary: aiText });
  } catch (error) {
    console.error("Groq AI Error:", error.response?.data || error.message);
    res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        "Failed to generate itinerary. Please try again later.",
    });
  }
});

export default router;
