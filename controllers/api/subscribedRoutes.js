const router = require('express').Router();
const { User, Subscribed, Feeds } = require('../../models');

// Get route returns all subcribed for a user
router.get('/:user_id', async (req, res) => {
    try {
        const subscribed = await User.findByPk({
            include: [{ model: Subscribed}, {model: Feeds}],
            attributes: [['user_name','id']],
        });

        res.status(200).json(subscribed);
    } catch (err) {
        res.status(501).json(err);
    }
});


// Post route to create a saved item
router.post('/:user_id', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const saved = await Saved.create({
                item_id: req.body.feed_id,
                user_id: req.session.user_id
            });
            res.status(200).json(saved);
        } else {
            const saved = await Saved.create({
                item_id: req.body.feed_id,
                user_id: req.body.user_id
            });
            res.status(200).json(saved);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});


// Delete route

router.delete('/', async (req, res) => {
  
    try {
        if (!req.body.user_id) {
      const subscribed = await Subscribed.destroy({
        where: {
            item_id: req.body.feed_id,
            user_id: req.session.user_id,
        },
    });
        res.status(200).json(saved);
        } else {
            const subscribed = await Subscribed.destroy({
                item_id: req.body.feed_id,
                user_id: req.body.user_id
            });
            res.status(200).json(subscribed);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;