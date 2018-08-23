const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const teachers = sequelize.define('teachers', {
  teacherId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  teacherName: Sequelize.STRING(500),
  companyName: Sequelize.INTEGER,
  businessType: Sequelize.STRING(500),
  businessNum: Sequelize.STRING(500),
  teacherNum: Sequelize.INTEGER,
  teacherPictureURL: Sequelize.INTEGER,
  selfIntroduction: Sequelize.STRING(500),
  record: Sequelize.STRING(500),
  realtimeNotice: Sequelize.INTEGER,
  personalQuestionNotice: Sequelize.INTEGER,
},{timestamps:false});

//teachers.sync();


module.exports.teachers = teachers;

