const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const axios = require("axios");
const PriceCheck = require("./services/priceChecker");
require("dotenv").config();
var cors = require("cors");

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

PriceCheck.checkprice();

app.get("/search", cors(), (req, res) => {
  axios
    .get("https://www.carnival.com/CruiseSearch/api/search?", {
      params: {
        useSuggestions: "true",
        showBest: "true",
        sort: "fromprice",
        port: req.query.port,
        dest: req.query.dest,
        dur: req.query.dur,
        excludeResults: req.query.excludeResults || false,
        pastGuest: req.query.pastGuest || false,
        numAdults: req.query.numAdults || 2,
        pageNumber: req.query.pageNumber || 1,
        pageSize: req.query.pageSize || 8,
      },
    })
    .then((resp) => res.send(resp.data));
});

app.use(routes);

app.listen(process.env.PORT || 3000, function () {
  console.log(`listening on ${process.env.PORT || 3000}`);
});
