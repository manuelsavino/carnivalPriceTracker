const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
var cron = require("node-cron");
const mongoose = require("mongoose");
const ItineraryController = require("./controllers/itineraryController");
const routes = require("./routes/index");
require("dotenv").config();

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

cron.schedule("0 1,13 * * *", () => {
  ItineraryController.getAll().then(itins => {
    itins.forEach(each => {
      (async () => {
        const browser = await puppeteer.launch();
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

app.use(routes);

app.listen(3000, function() {
  console.log("listening on 3000");
});
