const router = require('express').Router()
const { User, Feeds, Item, Saved, Subscribed } = require('../../models');

router.get('/', async (req,res)=> {
    const items = await User.findByPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [
            { model: Item }
        ]
    });
    console.log(items)
    res.render('homepage',{items})
});

module.exports = router;