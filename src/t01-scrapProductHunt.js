const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');

const $ = cheerio.load('our html page url here');
jsonframe($); // initializes the plugin

var frame = {
	"crypto": {           // setting the parent item as "companies"
		"selector": "#currencies > tbody > tr",    // defines the elements to search for
		"data": [{              // "data": [{}] defines a list of items
			"logo": ".s-s-bitcoin",          // inline selector defining "name" so "company"."name"
			"name": "td > a", // inline selector defining "description" as "company"."description"
			"url": {                                    // defining "url" by an attribute with "attr" and "selector" in an object
				"selector": "td > a",      // is actually the same as the inline selector
				"attr": "href"                              // the attribute name to retrieve
			},
			"marketcap": "td:nth-child(3)", // inline selector defining "description" as "company"."description"
			"price": "td:nth-child(4) > a:nth-child(1)", // inline selector defining "description" as "company"."description"
		}]
	}

};

let companiesList = $('.list.items').scrape(frame);
console.log(companiesList); // Output the data in the terminal
