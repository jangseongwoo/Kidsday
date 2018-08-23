const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const programs = require('../model/programs.js').programs;
const sequelize = require('./dbConnect');

const representations = sequelize.define('representations', {
  representationId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  representationPicURL: Sequelize.STRING(500),
  representationName: Sequelize.STRING(500),
},{timestamps:false});





//favorites.belongsTo(products,{foreignKey:'product_id',targetKey:'product_id'}); // 1:1관계
//brands.hasMany(products,{foreignKey:'brand_id',targetKey:'brand_id'}); // N:1관계
//users.hasMany(brands,{foreignKey:'user_id',targetKey:'user_id'});
//category_products.belongsToMany(products,{foreignKey:'product_id',targetKey:'product_id'})N:M;

//users.hasMany(favorites,{foreignKey:'user_id'});


module.exports.representations = representations;

