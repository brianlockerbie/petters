const { Post } = require('../models');

const postdata = [
  {
    title: 'Hammy the hamster',
    body: 'He just wants to relax',
    image_filter: 'sepia',
    user_id: 7,
    category_id: 3,
    image_url: 'images/1654043865360.PNG',
  },
  {
    title: 'A gentle giant',
    body: 'this dog also loves animals',
    image_filter: 'red-tint',
    user_id: 6,
    category_id: 4,
    image_url: 'images/1654045031458d.jpg',
  },
  {
    title: 'Save 10% or more on car insurance...',
    body: 'Just happy to be here',
    user_id: 5,
    category_id: 4,
    image_url: 'images/1654044111380.PNG',
  },
  {
    title: 'Found Nemo',
    body: 'fish are cute too, no?',
    image_filter: 'purple-tint',
    user_id: 3,
    category_id: 6,
    image_url: 'images/1654044757233.PNG',
  },
  {
    title: 'Nothin to see here, just a cat',
    body: 'what a cute cat',
    user_id: 1,
    category_id: 2,
    image_url: 'images/1654044917763.PNG',
  },
  {
    title: 'Here is a happy cat.',
    body: 'He looks sleepy but also very happy',
    image_filter: 'invert',
    user_id: 10,
    category_id: 2,
    image_url: 'images/1654045031458.PNG',
  },
  {
    title: 'The Wolf of Wall Street',
    body: 'Buy low sell high',
    user_id: 10,
    category_id: 1,
    image_url: 'images/1654045343007.PNG',
  },
  {
    title: 'Mr. Bird',
    body: 'Sing us a song, would ya?',
    user_id: 7,
    category_id: 5,
    image_url: 'images/1654045481149.PNG',
  },
  {
    title: 'A less common, but equally adorable pet',
    body: 'This ferret just wants to chill',
    user_id: 4,
    category_id: 5,
    image_url: 'images/1654045590031.PNG',
  },
  {
    title: 'King of the Jungle',
    body: 'who can resist a sun bath?',
    user_id: 9,
    category_id: 1,
    image_url: 'images/1654045706580.PNG',
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
