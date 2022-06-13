const router = require('express').Router();
const { Post, Comment, User, Like, Category } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  Post.findAll({
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
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
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
      const rawData = dbPostData.map((post) => post.get({ plain: true }));

      // ----------- Top commented
      // First push all the arrays inside the posts into a new object
      var topCommentedPosts = [];
      rawData.forEach((post) => {
        topCommentedPosts.push({
          post_id: post.id,
          comments: post.comments.length,
        });
      });
      // Then return the largest number
      topCommentedPosts.sort(function (a, b) {
        return a.comments - b.comments;
      });
      // Return only 5 posts
      topCommentedPosts.reverse();
      const postsCommentTempArr = topCommentedPosts.slice(0, 5);

      // Create a new object to hold the finals posts
      const postsCommentsObj = [];
      // Compare between the raw data object and the object we created above
      rawData.forEach((post1) => {
        postsCommentTempArr.forEach((post2) => {
          if (post1.id == post2.post_id) {
            // If the post id of the object matches with the raw data object, add it to the final object
            postsCommentsObj.push(post1);
          }
        });
      });
      // The finally, sort and return the posts
      postsCommentsObj.sort(function (a, b) {
        return a.comments.length - b.comments.length;
      });
      postsCommentsObj.reverse();

      // ----------- Top Liked
      rawData.sort(function (a, b) {
        return a.like_count - b.like_count;
      });
      rawData.reverse();
      const postsLikesObj = rawData.slice(0, 5);

      res.render('featured', {
        postsLikesObj,
        postsCommentsObj,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
