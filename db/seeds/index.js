const sequelize = require('../../config/connection');
const articleSeeds = require('./article-seeds');
const userSeeds = require('./user-seeds');

async () => {
  await sequelize.sync({ force: true });



  process.exit(0);
};
