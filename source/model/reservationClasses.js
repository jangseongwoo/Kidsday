const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const reservationClasses = sequelize.define('reservationClasses', {
  reservationClassId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  programId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  deposit: Sequelize.INTEGER,
  dateId: Sequelize.INTEGER,
  peopleNumber:Sequelize.INTEGER,
  userName: Sequelize.STRING(500),
  userPhoneNumber: Sequelize.STRING(500)
},{timestamps:false});



module.exports.reservationClasses = reservationClasses;

