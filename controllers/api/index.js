const router = require('express').Router();
const userRoutes = require('./userRoutes');
const savedRoutes = require('./savedRoutes');
const itemsRoutes = require('./itemsRoutes');
const feedsRoutes = require('./feedsRoutes');
const subscribedRoutes = require('./subscribedRoutes');


router.use('/users', userRoutes);
router.use('/saved', savedRoutes);
router.use('/items', itemsRoutes);
router.use('/subscribed', subscribedRoutes);
router.use('/feeds', feedsRoutes);

module.exports = router;