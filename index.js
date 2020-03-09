const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
var cron = require("node-cron");
const mongoose = require("mongoose");
const ItineraryController = require("./controllers/itineraryController");
const routes = require("./routes/index");
const axios = require("axios");
require("dotenv").config();
var cors = require("cors");

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

cron.schedule("0 1,13 * * *", () => {
  ItineraryController.getAll().then(itins => {
    if (itins.length > 0) {
      itins.forEach(each => {
        (async () => {
          const browser = await puppeteer.launch({ headless: false });
          const page = await browser.newPage();
          page.setViewport({ width: 1366, height: 768 });
          await page.goto(`https://${each.url}`);
          await page.waitForSelector(".price-text > .number");
          const element = await page.$(".price-text > .number");
          const price = await page.evaluate(
            element => element.textContent,
            element
          );
          await browser.close();
          if (price === "") {
            each.active = false;
            ItineraryController.update(each.id, each);
          } else {
            ItineraryController.updatePricingfromScrape(each.id, price);
          }
        })();
      });
    }
  });
});

app.get("/search", cors(), (req, res) => {
  axios
    .get("https://www.carnival.com/CruiseSearch/api/search?pastGuest=true", {
      params: {
        useSuggestions: "true",
        showBest: "true",
        sort: "fromprice",
        port: req.query.port,
        dest: req.query.dest,
        dur: req.query.dur,
        pastGuest: req.query.pastGuest || false,
        numAdults: req.query.numAdults || 2,
        pageNumber: req.query.pageNumber || 1,
        pageSize: req.query.pageSize || 8
      }
    })
    .then(resp => res.send(resp.data.results.itineraries));
});

app.use(routes);

app.listen(process.env.PORT, function() {
  console.log(`listening on ${process.env.PORT}`);
});
