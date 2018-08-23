const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const reservationVisits = sequelize.define('reservationVisits', {
  reservationVisitId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  programId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  date: Sequelize.STRING(500),
  deposit: Sequelize.INTEGER,
  approval: Sequelize.INTEGER,
  userName: Sequelize.STRING(500),
  userPhoneNumber: Sequelize.STRING(500),
  hopePlace: Sequelize.STRING(500),
  peopleNumber: Sequelize.INTEGER
},{timestamps:false});



module.exports.reservationVisits = reservationVisits;

