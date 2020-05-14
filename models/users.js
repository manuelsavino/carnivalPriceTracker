const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  itineraries: [{ type: String, ref: "Itinerary" }],
  user_id: String,
  email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
