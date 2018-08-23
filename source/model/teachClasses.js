const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const programs = require('../model/programs.js').programs;
const sequelize = require('./dbConnect');

const teachClasses = sequelize.define('teachClasses', {
  teachClassId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  teacherId: Sequelize.INTEGER,
  programId: Sequelize.INTEGER
},{timestamps:false});

//teachClasses.sync();



module.exports.teachClasses = teachClasses;

