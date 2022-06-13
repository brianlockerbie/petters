// Create the associations here
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const Like = require('./Like');
const Category = require('./Category');

// ------- ------- User
User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Like, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

// ------- ------- Post
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Like, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Category, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

// ------- ------- Like
Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Like.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

// ------- ------- Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL',
});

// ------- ------- Category
Category.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment, Like, Category };
