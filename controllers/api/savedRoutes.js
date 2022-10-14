const router = require('express').Router();
const { User, Saved, Item } = require('../../models');

// Get route returns all saved items for a user
router.get('/:user_id', async (req, res) => {
    try {
        const saved = await User.findByPk({
            include: [{ model: Saved}],
            attributes: [['user_name','id']],
        });

        res.status(200).json(saved);
    } catch (err) {
        res.status(501).json(err);
    }
});


// Post route to create a saved item
router.post('/:user_id', async (req, res) => {
    try {
        if (!req.body.user_id) {
            const saved = await Saved.create({
                item_id: req.body.item_id,
                user_id: req.session.user_id
            });
            res.status(200).json(saved);
        } else {
            const saved = await Saved.create({
                item_id: req.body.item_id,
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
      const saved = await Saved.destroy({
        where: {
            item_id: req.body.item_id,
            user_id: req.session.user_id,
        },
    });
        res.status(200).json(saved);
        } else {
            const saved = await Saved.destroy({
                item_id: req.body.item_id,
                user_id: req.body.user_id
            });
            res.status(200).json(saved);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;