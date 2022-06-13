const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Like } = require('../../models');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Access the req.body upon uploading a post to dynamically label the file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|JPEG|jpg|JPG|png|PNG/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Please upload a proper file format (JPG, JPEG, or PNG)');
  },
});

router.post('/', upload.single('image'), (req, res) => {
  // Extract the raw path
  const imagePath = req.file.path;
  var finalPath = '';
  // Convert to valid a link if on windows
  if (imagePath.includes('public\\')) {
    const updatedPath = imagePath.replace('public\\', '');
    finalPath = updatedPath.replace('images\\', 'images/');
    // Else, if on mac, run this conversion
  } else {
    finalPath = imagePath.replace('public/', '');
  }

  Post.create({
    title: req.body.title,
    body: req.body.desc,
    user_id: req.session.user_id,
    category_id: req.body.existing_categories,
    image_filter: req.body.image_filter,
    image_url: finalPath,
  })
    .then((dbPostData) => {
      res.redirect('/dashboard');
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/random', (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.desc,
    user_id: req.session.user_id,
    category_id: req.body.category_id,
    image_filter: req.body.image_filter,
    image_url: req.body.image_url,
  })
    .then((dbPostData) => {
      res.redirect('/dashboard');
    })
    .catch((err) => res.status(500).json(err));
});

// Get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
      'user_id',
      'image_url',
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
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get one post
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
      'user_id',
      'image_url',
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
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM `like` WHERE post.id = like.post_id)'
            ),
            'like_count',
          ],
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
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Update a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
      category_id: req.body.category_id,
      image_url: req.body.image_url,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/categories/:id', (req, res) => {
  Post.findAll({
    where: {
      category_id: req.params.id,
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
        attributes: ['user_id'],
      },
    ],
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
