const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes.js');
const dashboardRoutes = require('./dashboard.js');
const featuredRoutes = require('./featured-routes.js');
const searchRoutes = require('./search-routes.js');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/featured', featuredRoutes);
router.use('/search', searchRoutes);
router.use('/api', apiRoutes);

module.exports = router;
