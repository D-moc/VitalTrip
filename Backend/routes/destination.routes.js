

// // const express = require("express");
// // const router = express.Router();
// // const destinationController = require("../controllers/destination.controller");

// // // 🔍 Search destinations (used by Home.jsx)
// // router.get("/search", destinationController.searchDestinations);

// // // ➕ Add new destination (for testing / admin)
// // router.post("/add", destinationController.addDestination);

// // // 🧭 Get a single destination by ID (used by DestinationDetails.jsx)
// // router.get("/:id", destinationController.getDestinationById);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const destinationController = require("../controllers/destination.controller");
// const { authCaptain } = require("../middlewares/auth.middlewares");

// // 🔍 Search destinations (used by Home.jsx)
// router.get("/search", destinationController.searchDestinations);

// // 🧭 Get a single destination by ID (used by DestinationDetails.jsx)
// router.get("/:id", destinationController.getDestinationById);

// // ➕ Add new destination (Only for Captains/Admins)
// router.post("/add", authCaptain, destinationController.addDestination);

// // ✏️ Update destination (Only for Captains/Admins)
// router.put("/:id", authCaptain, async (req, res) => {
//   try {
//     const updated = await require("../models/destination.model").findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updated)
//       return res.status(404).json({ message: "Destination not found" });

//     res.status(200).json({ message: "Destination updated successfully", updated });
//   } catch (error) {
//     console.error("Error updating destination:", error);
//     res.status(500).json({ message: "Server error updating destination" });
//   }
// });

// // ❌ Delete destination (Only for Captains/Admins)
// router.delete("/:id", authCaptain, async (req, res) => {
//   try {
//     const deleted = await require("../models/destination.model").findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.status(404).json({ message: "Destination not found" });

//     res.status(200).json({ message: "Destination deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting destination:", error);
//     res.status(500).json({ message: "Server error deleting destination" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destination.controller");
const { verifyCaptainAccess } = require("../middlewares/roleAuth.middleware");

// 🔍 Search destinations (Public)
router.get("/search", destinationController.searchDestinations);

// 🧭 Get a single destination by ID (Public)
router.get("/:id", destinationController.getDestinationById);

// ➕ Add new destination (Captain-only)
router.post("/add", verifyCaptainAccess, destinationController.addDestination);

// ✏️ Update destination (Captain-only)
router.put("/:id", verifyCaptainAccess, async (req, res) => {
  try {
    const updated = await require("../models/destination.model").findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Destination not found" });

    res.status(200).json({ message: "Destination updated successfully", updated });
  } catch (error) {
    console.error("Error updating destination:", error);
    res.status(500).json({ message: "Server error updating destination" });
  }
});

// ❌ Delete destination (Captain-only)
router.delete("/:id", verifyCaptainAccess, async (req, res) => {
  try {
    const deleted = await require("../models/destination.model").findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Destination not found" });

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).json({ message: "Server error deleting destination" });
  }
});

module.exports = router;
