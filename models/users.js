const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  itineraries: [{ type: String, ref: "Itinerary" }],
  identifier: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
