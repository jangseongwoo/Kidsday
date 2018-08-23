const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');


const childs = sequelize.define('childs', {
  childId: { type: Sequelize.INTEGER, primaryKey: true, autoIncreament: true },
  userId: Sequelize.INTEGER,
  birthday: Sequelize.STRING(500),
  gender: Sequelize.STRING(500)
}, { timestamps: false });

//childs.sync();

module.exports.childs = childs;

