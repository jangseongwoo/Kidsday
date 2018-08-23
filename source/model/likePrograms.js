const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const likePrograms = sequelize.define('likePrograms', {
  likeProgramId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true,autoIncreament: true},
  programId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER,
  like: Sequelize.INTEGER
},{timestamps:false});

//likePrograms.sync();

module.exports.likePrograms = likePrograms;

