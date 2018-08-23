const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const dates = sequelize.define('dates', {
  dateId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  date: Sequelize.DATE,
  time: Sequelize.STRING(500),
  programId: Sequelize.INTEGER,
  currentReservationNumber: Sequelize.INTEGER
},{timestamps:false});

//dates.sync();

module.exports.dates = dates;

