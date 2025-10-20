// const express = require("express");
// const router = express.Router();
// const destinationController = require("../controllers/destination.controller");

// // GET /api/destinations/search?q=torna
// router.get("/search", destinationController.searchDestinations);

// // POST /api/destinations/add
// router.post("/add", destinationController.addDestination);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const destinationController = require("../controllers/destination.controller");

// router.get("/search", destinationController.searchDestinations);
// router.post("/add", destinationController.addDestination);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const destinationController = require("../controllers/destination.controller");

// // 🔍 Search destinations (e.g. /api/destinations/search?q=torna)
// router.get("/search", destinationController.searchDestinations);

// // ➕ Add a new destination
// router.post("/add", destinationController.addDestination);

// // 🗺️ Get destination details by ID (for /destination/:id page)
// router.get("/:id", destinationController.getDestinationById);

// module.exports = router;


const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destination.controller");

// 🔍 Search destinations (used by Home.jsx)
router.get("/search", destinationController.searchDestinations);

// ➕ Add new destination (for testing / admin)
router.post("/add", destinationController.addDestination);

// 🧭 Get a single destination by ID (used by DestinationDetails.jsx)
router.get("/:id", destinationController.getDestinationById);

module.exports = router;
