const router = require('express').Router();
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');
const parser = require('../../utils/Parser');

// Get route returns all items
// router.get('/', async (req, res) => {
//     try {
//         const items = await Item.findAll();

//         res.status(200).json(items);
//     } catch (err) {
//         res.status(501).json(err);
//     }
// });

// Get route returns one item by id
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findByPk(
            req.params.id,
        );


        res.status(200).json(item);
    } catch (err) {
        res.status(502).json(err);
    }
});

// Get route returns all items that a user is subscribed to
router.get('/', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const items = await User.findByPk(req.session.user_id, {
                attributes: { exclude: ['password'] },
                include: [
                    { model: Item }
                ]
            });
            res.status(200).json(items);
        } else {
            const items = await User.findByPk(req.body.user_id, {
                attributes: { exclude: ['password'] },
                include: [
                    { model: Item }
                ]
            });
            res.status(200).json(items);
        }
    } catch (err) {
        res.status(501).json(err);
    }
});

// Post route creates a new item
router.post('/', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const item = await Item.create({
                user_id: req.session.user_id,
                url: req.body.url,
                img_url: req.body.img_url,
                headline: req.body.headline,
                published_date: req.body.published_date,
                feed_id: req.body.feed_id,
            });
            req.session.save(() => {
                req.session.logged_in = true;

                res.status(200).json(item);
            });
        } else {
            const item = await Item.create({
                user_id: req.body.user_id,
                url: req.body.url,
                img_url: req.body.img_url,
                headline: req.body.headline,
                published_date: req.body.published_date,
                feed_id: req.body.feed_id,
            });
            req.session.save(() => {
                req.session.logged_in = true;

                res.status(200).json(item);
            });
        }

    } catch (err) {
        res.status(503).json(err);
    }
});

// Deletes an item by id
router.delete('/:id', async (req, res) => {
    try {
        const destroyItem = await Item.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(destroyItem);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const destroyItem = await Item.destroy(
                {
                    where: {
                        user_id: req.session.user_id
                    }
                }
            );
            res.status(200).json(destroyItem);
        } else {
            {
                const destroyItem = await Item.destroy(
                    {
                        where: {
                            user_id: req.body.user_id
                        }
                    }
                );
                res.status(200).json(destroyItem);
            }
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// Run the parser function to see items with fresh RSS data
router.post('/runparse/', async (req, res) => {
    try {
        const user_id = req.session.user_id;
        // Get all feeds that a user is subscribed to
        const subFeedData = await Subscribed.findAll({
            where: { user_id: user_id },
            include: [{ model: Feeds },],
        });

        // This next chunk of code is for preserving saved items.

        // Add get all saved items
        const savedItemsData = await Saved.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: Item }]
        });
        const savedItems = savedItemsData.map(item => item.item.get({ plain: true }));

        // Delete all items for user
        const deleteItems = await Item.destroy(
            {
                where: {
                    user_id: user_id
                }
            }
        );
        // Add saved items back to Items
        const savedToAdd = [];
        savedItems.forEach(item => {
            savedToAdd.push({
                url: item.url,
                headline: item.headline,
                published_date: item.published_date,
                feed_id: item.feed_id,
                user_id: user_id
            });
        });
        const addSavedItems = await Item.bulkCreate(savedToAdd, {validate: true});
        const resaveItems = addSavedItems.map(item => item.get({ plain: true }));
        // Create an array of {user_id, item_id} object pairs to add back into Saved
        const resaveObjects = [];
        resaveItems.forEach(item => {
            resaveObjects.push(
                {
                    user_id: user_id,
                    item_id: item.id
                }
            );
        });
        // Restore the saved items with a bulk create
        const restoreSaves = await Saved.bulkCreate(resaveObjects, {validate: true});
        // End of saved item preservation

        // Get an array of subscribed feeds, parse each feed, and add results to Items table via parser.parseFeed()
        const subFeeds = subFeedData.map(sub => sub.get({ plain: true }));
        subFeeds.forEach(feed => {
            const parse = async (url, feed_id) => {
                const testParse = await parser.parseFeed(url, user_id, feed_id);
            };
            const feedUrl = feed.feed.feed_url;
            const feedID = feed.feed.id;
            parse(feedUrl, feedID);
        });

        res.status(200).send(`Items parsed and added for userid ${user_id}`);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;