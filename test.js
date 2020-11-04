/* eslint-disable no-console */
require('dotenv').config();
const ScrapezoneClient = require('./index');

const {SCRAPEZONE_USERNAME, SCRAPEZONE_PASSWORD} = process.env;

const scrapezoneClient = new ScrapezoneClient(
    SCRAPEZONE_USERNAME,
    SCRAPEZONE_PASSWORD
);

async function run() {
    const results = await scrapezoneClient.scrape({
        scraper_name: 'amazon_product_display1',
        query: [
            'https://amazon.com/dp/B01LSUQSB0',
            'https://amazon.com/dp/B084K5HNCB'
        ]
    });
    return results;
}

run()
    .then(results => {
        console.log(results);
        process.exit(0);
    })
    .catch(e => {
        console.error(e.message);
        process.exit(1);
    });
