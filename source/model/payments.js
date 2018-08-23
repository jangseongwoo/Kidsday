const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const payments = sequelize.define('payments', {
  paymentId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  payDate: Sequelize.DATE,
  programId: Sequelize.INTEGER,
  //programName: Sequelize.STRING(500), 
  userId: Sequelize.INTEGER,
  paymentWay: Sequelize.STRING(500),
  money: Sequelize.INTEGER,
  depositorName: Sequelize.STRING(500),
  useMileage: Sequelize.INTEGER
},{timestamps:false});

//payments.sync();

module.exports.payments = payments;

