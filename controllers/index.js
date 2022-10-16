const router = require('express').Router();
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes');
const loginRoutes = require('./api/loginRoutes');
const testRoutes = require('./testRoutes');

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);
router.use('/', loginRoutes);
router.use('/test', testRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;