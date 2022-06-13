const { Like } = require('../models');

const likesdata = [
  {
    user_id: 7,
    post_id: 9,
  },
  {
    user_id: 6,
    post_id: 8,
  },
  {
    user_id: 3,
    post_id: 10,
  },
  {
    user_id: 3,
    post_id: 4,
  },
  {
    user_id: 7,
    post_id: 5,
  },
  {
    user_id: 1,
    post_id: 8,
  },
  {
    user_id: 6,
    post_id: 7,
  },
  {
    user_id: 7,
    post_id: 4,
  },
  {
    user_id: 6,
    post_id: 1,
  },
  {
    user_id: 6,
    post_id: 5,
  },
];

const seedLikes = () => Like.bulkCreate(likesdata);

module.exports = seedLikes;
