const axios = require("axios");

const endpoint = "https://api.scrapezone.com/scrape"

class ScrapezoneClient {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    async scrape({query, parser_name, country}) {
        try {
            const { data } = await axios.post(
                endpoint,
                {
                    query,
                    parser_name,
                    country
                },
                {
                    auth: {
                        username: this.username,
                        password: this.password
                    },
                }
            );
            const results = await this.getResults(data.job_id);
            return results;
        } catch (error) {
            console.error("scrapeHtmlBatch function errored", error.response.data);
            throw error;
        }
    }

    async getResults(jobId) {
        try {
            while (true) {
                const {data} = await axios.get(
                    `${endpoint}/${jobId}`,
                    {
                        auth: {
                            username: this.username,
                            password: this.password
                        },
                    }
                )
                if (data.status === 'done') {
                    const {data: parsedResults} = await axios.get(data['parsed_results_json']);
                    return parsedResults;
                } else if (data.status === 'faulted') {
                    console.log(data);
                    return null;
                }
                await this.sleep(2000);
            }
        } catch (error) {
            console.log("scrapeHtmlBatch function errored", error);
            throw error;
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = ScrapezoneClient;
