const Sequelize = require('sequelize');
const dotenv = require('dotenv');

require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(
    process.env.DB_APP_DATABASE,
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    });
}
module.exports = sequelize;
