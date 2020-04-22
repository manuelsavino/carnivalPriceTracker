const db = require("../models");

module.exports = {
  newTracker(req, res) {
    const { url } = req.params;
    if (url.indexOf("https") != -1) {
      url = url.substring(url.indexOf("www"));
    }
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
    return await db.Itinerary.find({ active: true }).exec();
  },

  updatePricing(_id, price) {
    db.Itinerary.updateOne(
      { _id },
      { $push: { prices: { price: price, date: Date.now() } } },
      (err, upd) => {
        return upd;
      }
    );
  },
  updatePricingfromScrape(_id, price) {
    db.Itinerary.updateOne(
      { _id },
      { $push: { prices: { price: price, date: Date.now() } } },
      (err, upd) => {
        return upd;
      }
    );
  },

  update(_id, itin) {
    db.Itinerary.updateOne({ _id }, itin, (err, upd) => {
      return upd;
    });
  },

  updatePricing(req, res) {
    const { id: _id, price } = req.params;
    db.Itinerary.updateOne(
      { _id },
      { $push: { prices: { price: price, date: Date.now() } } },
      (err, upd) => {
        res.status(200).json(upd);
      }
    );
  },
  deleteOne(req, res) {
    const { id: _id } = req.params;
    db.Itinerary.findOneAndDelete({ _id }, (err, deleted) => {
      res.json(deleted);
    });
  },
};
