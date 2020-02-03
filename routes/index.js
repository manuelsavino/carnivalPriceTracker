const router = require("express").Router(),
  itinRoutes = require("./itineraries"),
  userRoutes = require("./users");

router.use("/itins/", itinRoutes);
router.use("/users/", userRoutes);

module.exports = router;
