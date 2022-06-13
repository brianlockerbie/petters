const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    category_name: {
      type: DataTypes.STRING(),
      allowNull: false,
      validation: {
        len: [1],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
