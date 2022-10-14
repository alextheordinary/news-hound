const RSSParser = require('rss-parser');

class Parser {
    constructor(url) {
        this.url = url;
        this.feedData = [];
        const parse = async url => {
            const feed = await new RSSParser().parseURL(url);
            feed.items.forEach(item => {
                this.feedData.push([item.title, item.link, item.isoDate]);
            });
            console.log(this.feedData);
        };
        parse(this.url);
    }

};

module.exports = Parser;

