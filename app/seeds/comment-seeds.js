const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Nunc rhoncus dui vel sem.',
    user_id: 6,
    post_id: 1,
  },
  {
    comment_text:
      'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 6,
    post_id: 8,
  },
  {
    comment_text: 'Aliquam erat volutpat. In congue.',
    user_id: 3,
    post_id: 7,
  },
  {
    comment_text:
      'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 3,
    post_id: 4,
  },
  {
    comment_text: 'In hac habitasse platea dictumst.',
    user_id: 7,
    post_id: 5,
  },
  {
    comment_text: 'Vivamus vestibulum sagittis sapien.',
    user_id: 1,
    post_id: 4,
  },
  {
    comment_text:
      'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 6,
    post_id: 7,
  },
  {
    comment_text: 'Sed vel enim sit amet nunc viverra dapibus.',
    user_id: 7,
    post_id: 4,
  },
  {
    comment_text:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.',
    user_id: 6,
    post_id: 2,
  },
  {
    comment_text: 'Morbi a ipsum.',
    user_id: 6,
    post_id: 10,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
