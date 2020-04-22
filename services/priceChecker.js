const ItineraryController = require("../controllers/itineraryController");
const puppeteer = require("puppeteer");
var cron = require("node-cron");

module.exports = {
  checkprice() {
    cron.schedule("0 1,13 * * *", () => {
      ItineraryController.getAll().then((itins) => {
        if (itins.length > 0) {
          itins.forEach((each) => {
            (async () => {
              const browser = await puppeteer.launch({ headless: false });
              const page = await browser.newPage();
              page.setViewport({ width: 1366, height: 768 });
              await page.goto(`https://${each.url}`);
              await page.waitForSelector(".price-text > .number");
              const element = await page.$(".price-text > .number");
              const price = await page.evaluate(
                (element) => element.textContent,
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
  },
};
