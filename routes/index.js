const router = require("express").Router(),
  itinRoutes = require("./itineraries"),
  userRoutes = require("./users"),
  cruiseSearch = require("./cruiseSearch");

router.use("/itins/", itinRoutes);
router.use("/users/", userRoutes);
// router.use("/search/", cruiseSearch);

module.exports = router;
