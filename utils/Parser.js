const RSSParser = require('rss-parser');
const {Item, User, Feeds} = require('../models');

module.exports = {
    parseFeed: async (url, user_id, feed_id) => {
        this.url = url;
        this.user_id = user_id;
        this.feed_id = feed_id;
        const feedData = [];
        const parse = async url => {
            const feed = await new RSSParser().parseURL(url);
            feed.items.forEach(item => {
                if (!item.isoDate) {

                } else {
                const url = item.link;
                const headline = item.title;
                const published_date = item.isoDate;
                feedData.push({url, headline, published_date, feed_id, user_id});
            }});
            const addFeedData = await Item.bulkCreate(feedData, {validate: true});    
            return;  
        };
        parse(this.url);
    }

};


