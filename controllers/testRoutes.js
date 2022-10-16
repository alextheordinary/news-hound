const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Feeds, Item, Saved, Subscribed } = require('../models');
const parser = require('../utils/Parser');

// Set the req.session.user_id field
router.get('/setuserid/:id', async (req, res) => {
    let sess = req.session;
    sess.user_id = req.params.id;
    res.send(`Set user id to: ${sess.user_id}`);
});

// Get the req.session.user_id field
router.get('/getuserid/', async (req, res) => {
    let sess = req.session;
    res.send(`The user id is: ${sess.user_id}`);
});

// Run the parser function to see items with fresh RSS data
router.get('/runparse/', async (req, res) => {
    const user_id = req.session.user_id;
    const subFeedData = await Subscribed.findAll({
        where: {user_id: user_id},
        include: [{ model: Feeds  },],
    });
    // console.log(subFeedData);
    const subFeeds = subFeedData.map(sub => sub.get({ plain: true }));
    subFeeds.forEach(feed => {
        const parse = async (url, feed_id) => {
            const testParse = await parser.parseFeed(url, user_id, feed_id);
        };
        const feedUrl = feed.feed.feed_url;
        const feedID = feed.feed.id;
        parse(feedUrl, feedID);
    });

    res.send('Ran a parse');
});

router.get('/seeddata/', async (req, res) => {
    // Reset table data
    const resetTables = await sequelize.sync({ force: true });
    // Seed users
    const userData = [
        {
            user_name: 'Alex',
            email: 'alex@test.com',
            password: 'password',
        },
        {
            user_name: 'Liz',
            email: 'liz@test.com',
            password: 'password',
        },
        {
            user_name: 'Nelson',
            email: 'nelson@test.com',
            password: 'password',
        },
    ];
    const addUserData = await User.bulkCreate(userData, { validate: true });
    // Seed Feeds
    const feedData = [
        {
            name: 'NBA News',
            feed_url: 'https://www.espn.com/espn/rss/nba/news',
            source: 'ESPN'
        },
        {
            name: 'World News',
            feed_url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
            source: 'UN News'
        },
        {
            name: 'NFL News',
            feed_url: 'https://www.espn.com/espn/rss/nfl/news',
            source: 'ESPN'
        },
    ];
    const addFeedData = await Feeds.bulkCreate(feedData, { validate: true });
    // Seed subscribed
    const subscribedData = [
        { user_id: 1, feed_id: 1 },
        { user_id: 1, feed_id: 2 },
        { user_id: 1, feed_id: 3 },
        { user_id: 2, feed_id: 1 },
        { user_id: 2, feed_id: 3 },
        { user_id: 3, feed_id: 3 },
    ];
    const addSubscribedData = await Subscribed.bulkCreate(subscribedData, { validate: true });

    res.send('Seeded data');
});

router.get('/getusers', async (req, res) => {
    try {
        const users = await User.findAll({
            // attributes: { exclude: ['password'] },
            order: [['user_name', 'ASC']],
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(501).json(err);
    }
});



module.exports = router;