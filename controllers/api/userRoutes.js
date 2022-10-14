const router = require('express').Router();
const { User } = require('../../models');

// Get route returns all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(501).json(err);
    }
});

// Get route returns one user by id
router.get('/:id', async (req, res) => {
    try {
        const users = await Post.findByPk(
            req.params.id,
        );


        res.status(200).json(users);
    } catch (err) {
        res.status(502).json(err);
    }
});

// Post route creates a user
router.post('/', async (req, res) => {
    try {
        const users = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(users);
        });
    } catch (err) {
        res.status(503).json(err);
    }
});

module.exports = router;