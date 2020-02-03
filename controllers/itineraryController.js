const db = require("../models");

module.exports = {
  newTracker(req, res) {
    console.log("controller hit");
    const { url } = req.params;
    const Itinerary = { url, date: Date.now() };
    db.Itinerary.create(Itinerary, (err, Itinerary) => {
      if (err) {
        console.log(err);
      }
      res.json(Itinerary);
    });
  },

  getAllItins(req, res) {
    db.Itinerary.find({}, (err, itins) => {
      res.json(itins);
    });
  },

  async getAll() {
    return await db.Itinerary.find({}).exec();
  },

  update(_id, price) {
    db.Itinerary.updateOne(
      { _id },
      { $push: { prices: { price: price, date: Date.now() } } },
      (err, upd) => {
        return upd;
      }
    );
  },

  updatePricing(req, res) {
    console.log("update hit");
    const { id: _id, price } = req.params;
    db.Itinerary.updateOne(
      { _id },
      { $push: { prices: { price: price, date: Date.now() } } },
      (err, upd) => {
        res.status(200).json(upd);
      }
    );
  }
};
