const express = require("express");
const app = express();
const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
var cron = require("node-cron");
const mongoose = require("mongoose");
const ItineraryController = require("./controllers/itineraryController");
const db = require("./models");

mongoose.connect(
  "mongodb://admin:ccl1013902@ds353358.mlab.com:53358/cclpricetracker",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

cron.schedule("0 8 * * *", () => {
  ItineraryController.getAll().then(itins => {
    itins.forEach(each => {
      (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setViewport({ width: 1366, height: 768 });
        await page.goto(`https://${each.url}`);
        await page.waitForSelector(".price-text > .number");
        const element = await page.$(".price-text > .number");
        const text = await page.evaluate(
          element => element.textContent,
          element
        );
        // await page.screenshot({ path: `SC${Date.now()}.png` });

        await browser.close();
        ItineraryController.update(each.id, text);
      })();
    });
  });
});

app.get("/new/:url", ItineraryController.newTracker);
app.get("/itins/", ItineraryController.getAllItins);

app.get("/itins/:id/:price", ItineraryController.updatePricing);

app.listen(3000, function() {
  console.log("listening on 3000");
});
