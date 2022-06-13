const router = require('express').Router();
const { Post, User, Comment, Category, Pet, Like } = require('../models');
const sequelize = require('../config/connection');

// In order for the search to be functional, we execute 2 sequelize commands.
// 1st command returns the user himself based on if the search term matches with the username in the database
// After we grab said users, we push them through the execution to be used in the next sequelize command
// The 2nd command returns ALL posts (regardless of the data) and we use the user data (with JUST the chosen users) to...
// test against all available posts. We run 2 forEach statements and we test the chosen user id's against all available post related user_id
router.get('/user/:username', (req, res) => {
  // To search and return the correct results, we first execute a sequelize command to return users based
  // on the username that a user searches up (this can be incomplete names too)
  User.findAll({
    where: {
      username: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('username')),
        'LIKE',
        '%' + req.params.username.toLowerCase() + '%'
      ),
    },
  })
    .then((data) => {
      const userData = data.map((post) => post.get({ plain: true }));
      // We then return the data afterwards to be used below
      return userData;
    })
    // Then we execute another sequelize command that returns all posts (in general) without using 'where'
    .then((userData) => {
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
            attributes: ['post_id', 'user_id', 'liked'],
          },
        ],
      })
        .then((dbPostData) => {
          const postData = dbPostData.map((post) => post.get({ plain: true }));
          // From here we create a new object to hold the correct posts by the chosen username
          var userPostObject = [];

          // We take the chosen users' id (which is returned from the first sequelize command) and we test it against all the posts in the data base
          // if the chosen users' id == the posts related user_id data, push that post
          userData.forEach((user) => {
            postData.forEach((post) => {
              if (user.id == post.user_id) {
                userPostObject.push(post);
              }
            });
          });
          // if the object is not empty, return the data
          if (userPostObject.length >= 1) {
            res.json(userPostObject);
          } else {
            // Else return no user found
            res.json('No Users found');
          }
        })
        .catch((err) => {
          res.json('No Users found');
        });
    });
});

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
  }).then((data) => {
    var categoryArr = [];
    const categories = data.map((post) => post.get({ plain: true }));
    categories.forEach((category) => {
      categoryArr.push({
        id: category.id,
        category_name: category.category_name,
      });
    });
    res.render('search', {
      categoryArr,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  });
});

module.exports = router;
