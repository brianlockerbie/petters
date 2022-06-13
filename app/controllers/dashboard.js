const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, Like, User, Category } = require('../models');
const withAuth = require('../../utils/auth');

// Return all posts associated with the user
// router.get('/', withAuth, (req, res) => {
router.get('/', withAuth, (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
  })
    .then((data) => {
      var categoryArr = [];
      const categories = data.map((post) => post.get({ plain: true }));
      categories.forEach((category) => {
        categoryArr.push({
          id: category.id,
          category_name: category.category_name,
        });
      });
      return categoryArr;
    })
    .then((categoryArr) => {
      // Add a new route here that returns all posts associated with user, you can easily extract this via 'req.session.user_id'
      // Return all users active posts in the data base
      Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: [
          'id',
          'title',
          'body',
          'created_at',
          'user_id',
          'image_url',
          'image_filter',
          [
            sequelize.literal(
              '(SELECT category_name FROM `category` WHERE post.category_id = category.id)'
            ),
            'category_name',
          ],
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM `like` WHERE post.id = like.post_id)'
            ),
            'like_count',
          ],
        ],
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comment_text',
              'user_id',
              'post_id',
              'created_at',
            ],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Like,
            attributes: ['user_id'],
          },
        ],
      })
        .then((dbPostData) => {
          const posts = dbPostData.map((post) => post.get({ plain: true }));
          posts.reverse();
          console.log(posts);
          res.render('dashboard', {
            posts,
            categories: categoryArr,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
});

module.exports = router;
