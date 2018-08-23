const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const messages = sequelize.define('messages', {
  messageId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  fromUserId: Sequelize.INTEGER,
  toUserId: Sequelize.INTEGER,
  messageDetail: Sequelize.STRING(500),
  time: Sequelize.DATE,
  programId: Sequelize.INTEGER
},{timestamps:false});

//messages.sync();

module.exports.messages = messages;

