const router = require('express').Router();
const { Category } = require('../../models');

//get all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get one category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//create new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.redirect('/dashboard'))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//delete category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
