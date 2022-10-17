const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');

router.get('/', async (req,res)=> {
    const items = await Item.findAll({
        where: { user_id: req.session.user_id }
    });
    // const userItems = items.get({ plain: true });
    const userItems = items.map(item => item.get({ plain: true }));
    console.log(userItems);
    res.render('homepage', {items: userItems, logged_in: req.session.logged_in});
});

module.exports = router;