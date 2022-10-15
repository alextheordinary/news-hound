const RSSParser = require('rss-parser');
const {Item} = require('../models');

module.exports = {
    parseFeed: async (url) => {
        this.url = url;
        const feedData = [];
        const parse = async url => {
            const feed = await new RSSParser().parseURL(url);
            feed.items.forEach(item => {
                const url = item.link;
                const headline = item.title;
                const published_date = item.isoDate;
                const feed_id = 2; // need to figure out how to get this
                const user_id = 1; // need to add this in for real
                feedData.push({url, headline, published_date, feed_id, user_id});
            });
            const addFeedData = await Item.bulkCreate(feedData, {validate: true});    
            return;  
        };
        parse(this.url);
    }

};


