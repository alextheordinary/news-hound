const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req,res)=> {
    const subFeedData = await Feeds.findAll({
        include: [{ model: Subscribed, where: {user_id: req.session.user_id } },],
    });
    // const userItems = items.get({ plain: true });
    const subFeeds = subFeedData.map(sub => sub.get({ plain: true }));
    console.log(subFeeds);

    res.render('manage-feeds', {feeds: subFeeds, user_id: req.session.user_id, logged_in: req.session.logged_in});
});

module.exports = router;