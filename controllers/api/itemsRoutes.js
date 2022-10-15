const router = require('express').Router();
const { Item, User } = require('../../models');

// Get route returns all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();

        res.status(200).json(items);
    } catch (err) {
        res.status(501).json(err);
    }
});

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
        const items = await User.findByPk(req.params.id, {
            include: [
                {model: Item }
            ]
        });

        res.status(200).json(items);
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

module.exports = router;