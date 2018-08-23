const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const mileages = sequelize.define('mileages', {
  mileagesId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  userId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  earnMileage: Sequelize.INTEGER
},{timestamps:false});

//mileages.sync();

module.exports.mileages = mileages;

