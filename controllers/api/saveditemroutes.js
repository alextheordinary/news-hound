const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.get('/saved', withAuth, async (req,res)=> {
    const items = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [
            { model: Item }
        ]
    });
    res.render('saved',{items, logged_in: req.session.logged_in})
});

module.exports = router;