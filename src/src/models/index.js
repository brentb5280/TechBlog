const Article = require('./article');
const User = require('./user');


User.hasMany(Article, {
  foreignKey: 'user_id',
});

Article.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { Article, User }
