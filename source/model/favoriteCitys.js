const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const favoriteCitys = sequelize.define('favoriteCitys', {
  favoriteCityId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  favoriteCity: Sequelize.STRING(500),
  userId: Sequelize.STRING(500)
},{timestamps:false});

//favoriteCategorys.sync();

module.exports.favoriteCitys = favoriteCitys;

