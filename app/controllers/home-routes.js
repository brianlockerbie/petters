const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Like, Category } = require('../models');

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
        attributes: ['post_id', 'user_id', 'liked'],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      const likedArr = [];
      posts.forEach((post) => {
        likedArr.push(post.likes);
      });

      const usersLikes = [];
      likedArr.forEach((like) => {
        like.forEach((like2) => {
          if (like2.user_id == req.session.user_id) {
            usersLikes.push(like2);
          }
        });
      });

      posts.forEach((post) => {
        usersLikes.forEach((like) => {
          if (post.id == like.post_id) {
            post.likes = true;
          }
        });
      });

      posts.reverse(req.session.loggedIn);
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Renders a single post with more detail
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id, // params == endpoint url data
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
        attributes: ['post_id', 'user_id', 'liked'],
      },
    ],
  })
    .then((dbPostData) => {
      const id = dbPostData.dataValues.id;
      const title = dbPostData.dataValues.title;
      const user = dbPostData.dataValues.user.username;
      const date = dbPostData.dataValues.created_at;
      const description = dbPostData.dataValues.body;
      const image = dbPostData.dataValues.image_url;
      const like_count = dbPostData.dataValues.like_count;
      const likes = dbPostData.dataValues.likes;
      const category_name = dbPostData.dataValues.category_name;
      const image_filter = dbPostData.dataValues.image_filter;
      const post = {
        id,
        title,
        date,
        user,
        description,
        category_name,
        comments: [],
        image,
        like_count,
        likes,
        image_filter,
      };

      // For each comment, push it to the array inside our object
      for (let i = 0; i < dbPostData.dataValues.comments.length; i++) {
        let username = dbPostData.dataValues.comments[i].user.username;
        let commentText = dbPostData.dataValues.comments[i].comment_text;
        let user_id = dbPostData.dataValues.comments[i].dataValues.user_id;
        let comment_id = dbPostData.dataValues.comments[i].dataValues.id;
        let commentDate =
          dbPostData.dataValues.comments[i].dataValues.created_at;

        post.comments.push({
          user: username,
          userId: user_id,
          text: commentText,
          date: commentDate,
          commentId: comment_id,
          // Check the username of each comment and return 'true' if username matches logged in user
          usersComment: username == req.session.username,
        });
      }
      post.comments.reverse();

      // Get the users likes
      const usersLikes = [];
      post.likes.forEach((like) => {
        if (like.user_id == req.session.user_id) {
          usersLikes.push(like.dataValues);
        }
      });

      usersLikes.forEach((like) => {
        if (post.id == like.post_id) {
          post.likes = true;
        }
      });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
