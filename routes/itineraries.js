const router = require("express").Router();
const cors = require("cors");
const ItineraryController = require("../controllers/itineraryController");
router.route("/").get(cors(), ItineraryController.getAllItins);
router.get("/new/:url", ItineraryController.newTracker);
router.put("/:id/:price", ItineraryController.updatePricing);
router.delete("/:id", ItineraryController.deleteOne);

module.exports = router;
