const router = require('express').Router();
const userRoutes = require('./user-api-routes');
const articleRoutes = require('./article-api-routes');

router.use('/user', userRoutes);
router.use('/article', articleRoutes);

module.exports = router;
