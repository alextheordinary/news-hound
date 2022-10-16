const router = require('express').Router();
const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes');
const loginRoutes = require('./api/loginRoutes');
const testRoutes = require('./testRoutes');
const homePageRoutes = require('./api/homepageroutes');
const saved = require('./api/saveditemroutes');

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);
router.use('/', loginRoutes);
router.use('/test', testRoutes);
router.use(homePageRoutes);
router.use('/', saved);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;