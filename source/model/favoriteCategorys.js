const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const favoriteCategorys = sequelize.define('favoriteCategorys', {
  favoriteCategoryId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  userId: Sequelize.INTEGER,
  Category: Sequelize.STRING(500)
},{timestamps:false});

//favoriteCategorys.sync();

module.exports.favoriteCategorys = favoriteCategorys;

