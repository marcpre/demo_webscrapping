const axios = require('axios'); // HTTP client
const cheerio = require('cheerio'); // HTML parsing package
const jsonframe = require('jsonframe-cheerio'); // a cheerio plugin I designed
const fs = require('fs'); // is included in node.js - you don't need to install it

axios.get('https://www.producthunt.com')
    .then((response) => {

        if (response.status === 200) {

            var html = response.data;
            let $ = cheerio.load(html); // We load the html we received into cheerio's parser
            jsonframe($); // We add the plugin to the cheerio's parser

            fs.writeFileSync('ph.html', html); // This saves the html to a ph.html for checks

            var productsFrame = { // This is a simple conversation of the data structure
                "products": { // thanks to jsonframe
                    "selector": "ul.postsList_3n2Ck li",
                    "data": [{
                        "name": ".content_3Qj0y .title_24w6f",
                        "description": ".content_3Qj0y .subtle_fyrho",
                        "image": {
                            "selector": "img",
                            "attr": "src"
                        },
                        "upvotes": "[data-test=vote-button] .buttonContainer_1ROJn",
                        "comments": "[data-test=vote-button] + a .buttonContainer_1ROJn"
                    }]
                }
            };

            var products = $('body').scrape(productsFrame); // Scrape the list of products based on the json frame we defined before
            fs.writeFileSync("products.json", JSON.stringify(products, null, 2)); // You can see that the output json is structured the way we wanted it thanks to the json frame
        }

    }, (error) => {
        console.log("Humm: ", error);
    });
