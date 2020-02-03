const router = require("express").Router();
const ItineraryController = require("../controllers/itineraryController");
router.route("/").get(ItineraryController.getAllItins);
router.get("/new/:url", ItineraryController.newTracker);
router.put("/:id/:price", ItineraryController.updatePricing);

module.exports = router;
