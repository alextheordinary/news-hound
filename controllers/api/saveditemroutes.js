const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');
const { withAuth } = require('../../utils/auth');

router.get('/saved', withAuth, async (req,res)=> {
    const items = await Item.findAll({
        order: [['published_date', 'DESC']],
        include: [{model: Saved, where: {user_id: req.session.user_id}}, {model: Feeds}],
        where: { user_id: req.session.user_id },
    });
    // const userItems = items.get({ plain: true });
    const userItems = items.map(item => item.get({ plain: true }));
    res.render('saved', {items: userItems, logged_in: req.session.logged_in});
});

module.exports = router;