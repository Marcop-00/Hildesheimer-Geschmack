const express = require("express");
const router = express.Router();

// Import Route Files
const restaurantRoutes = require("./restaurants");
const userRoutes = require("./users");

// Mount Routes with Distinct Paths
router.use("/api/restaurants", restaurantRoutes); // Mount restaurant routes under /api/restaurants
router.use("/api/users", userRoutes); // Mount user routes under /api/users

module.exports = router;
