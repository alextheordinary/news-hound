const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../models');

router.get('/', async (req,res)=> {
    const feedData = await Feeds.findAll();
    const subFeedData = await Subscribed.findAll(
        {
            where: {user_id: req.session.user_id}
        });
    // const userItems = items.get({ plain: true });
    const feedsRaw = feedData.map(sub => sub.get({ plain: true }));
    const subFeeds = subFeedData.map(sub => sub.get({ plain: true }));
    console.log(subFeeds);
    const feeds = [];
    feedsRaw.forEach(feed => {
        let subbed = false;
        subFeeds.forEach(subFeed => {
            if (feed.id === subFeed.feed_id) {
                subbed = true;
            }
        });
            feeds.push({
                id: feed.id, 
                name: feed.name, 
                feed_url: feed.feed_url, 
                source: feed.source, 
                subscribed: subbed
            });    
    });
    console.log(feeds);
    res.render('manage-feeds', {feeds: feeds, user_id: req.session.user_id, logged_in: req.session.logged_in});
});

module.exports = router;