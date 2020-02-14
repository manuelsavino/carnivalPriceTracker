const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  prices: [{ price: String, date: { type: Date, default: Date.now() } }],
  date: { type: Date, default: Date.now() },
  url: String,
  active: { type: Boolean, default: true }
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
module.exports = Itinerary;
