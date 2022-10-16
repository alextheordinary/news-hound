const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');

router.get('/saved', async (req,res)=> {
    const items = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [
            { model: Item }
        ]
    });
    res.render('saved',{items})
});

module.exports = router;