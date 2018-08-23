const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const detailInfos = sequelize.define('detailInfos', {
  detailInfoId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  pictureURL: Sequelize.STRING(500),
  programId: Sequelize.INTEGER,
  detailInfo: Sequelize.STRING(500)
},{timestamps:false});

//detailInfos.sync();

module.exports.detailInfos = detailInfos;

