require('dotenv').config();
const ScrapezoneClient = require('./index');

const {SCRAPEZONE_USERNAME, SCRAPEZONE_PASSWORD} = process.env;

const scrapezoneClient = new ScrapezoneClient(
    SCRAPEZONE_USERNAME,
    SCRAPEZONE_PASSWORD
);

async function run() {
    const results = await scrapezoneClient.scrape({
        parser_name: 'amazon_product_display',
        query: [
            'https://amazon.com/dp/B01LSUQSB0',
            'https://amazon.com/dp/B084K5HNCB'
        ]
    });
    console.log(results);
}

run().catch(e => console.error(e.message));
