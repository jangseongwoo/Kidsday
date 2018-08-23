const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const reviews = sequelize.define('reviews', {
  reviewId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  programId: Sequelize.INTEGER,
  reviewDetail: Sequelize.STRING(500),
  userId: Sequelize.INTEGER,
  date: Sequelize.DATE,
  starPoint: Sequelize.INTEGER
},{timestamps:false});

//reviews.sync();

module.exports.reviews = reviews;

