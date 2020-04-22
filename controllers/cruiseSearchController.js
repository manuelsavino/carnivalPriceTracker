module.exports = {
  newTracker(req, res) {
    const { url } = req.params;
    const Itinerary = { url, date: Date.now() };
    db.Itinerary.create(Itinerary, (err, Itinerary) => {
      if (err) {
        console.log(err);
      }
      res.json(Itinerary);
    });
  },
};
