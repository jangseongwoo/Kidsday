const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const programs = require('../model/programs.js').programs;
const sequelize = require('./dbConnect');

const themas = sequelize.define('themas', {
  themaId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  themaName: Sequelize.STRING(500),
  category: Sequelize.STRING(500)
},{timestamps:false});

//themas.sync();



module.exports.themas = themas;

