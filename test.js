const ScrapezoneClient = require('./index');
const scrapezoneClient = new ScrapezoneClient('bbb', 'aaa');

async function run(){
    const results = await scrapezoneClient.scrape({
        parser_name: "amazon_product_display",
        query: [
            "https://amazon.com/dp/B01LSUQSB0",
            "https://amazon.com/dp/B084K5HNCB"
        ]
    });
    console.log(results);
}

run().catch(e => console.error(e));