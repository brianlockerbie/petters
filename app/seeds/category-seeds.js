const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'dogs',
  },
  {
    category_name: 'cats',
  },
  {
    category_name: 'small-pets',
  },
  {
    category_name: 'reptile',
  },
  {
    category_name: 'wild',
  },
  {
    category_name: 'fish',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
