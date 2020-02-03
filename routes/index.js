const router = require("express").Router(),
  itinRoutes = require("./itineraries");

router.use("/itins", itinRoutes);

module.exports = router;
