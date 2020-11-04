/* eslint-disable camelcase */
/* eslint-disable no-console */
const axios = require('axios');
const Joi = require('joi');

class ScrapezoneClient {
    constructor(username, password) {
        this.endpoint = 'https://api.scrapezone.com/scrape';
        this.username = username;
        this.password = password;
    }

    async validateScrapeInputs({query, scraper_name, country}) {
        const schema = Joi.object({
            query: Joi.array().min(1).max(1000).required(),
            scraper_name: Joi.string().required(),
            country: Joi.string()
        });
        await schema.validateAsync({
            query,
            scraper_name,
            country
        });
        return true;
    }

    async scrape({query, scraper_name, country}) {
        try {
            await this.validateScrapeInputs({query, scraper_name, country});

            const {data} = await axios.post(
                this.endpoint,
                {
                    query,
                    scraper_name,
                    country
                },
                {
                    auth: {
                        username: this.username,
                        password: this.password
                    }
                }
            );
            const results = await this.getResults(data.job_id);
            return results;
        } catch (error) {
            if (error.response.data && error.response.data.errors) {
                for (const err of error.response.data.errors) {
                    console.error(`${err.msg}: ${err.value}`);
                }
            } else {
                console.error(error.response.data);
            }
            throw error;
        }
    }

    async getResults(jobId) {
        try {
            while (true) {
                const {data} = await axios.get(`${this.endpoint}/${jobId}`, {
                    auth: {
                        username: this.username,
                        password: this.password
                    }
                });
                if (data.status === 'done') {
                    const {data: parsedResults} = await axios.get(
                        data.parsed_results_json
                    );
                    return parsedResults;
                }

                if (data.status === 'faulted') {
                    console.log(data);
                    return null;
                }
                console.log('Waiting for results..');
                await this.sleep(2000);
            }
        } catch (error) {
            console.log('scrapeHtmlBatch function errored', error);
            throw error;
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = ScrapezoneClient;
