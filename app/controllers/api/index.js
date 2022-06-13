const router = require('express').Router();

const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const categoryRoutes = require('./category-routes');
const likeRoutes = require('./like-routes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/category', categoryRoutes);
router.use('/likes', likeRoutes);

module.exports = router;
