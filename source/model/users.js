const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const users = sequelize.define('users', {
  userId: {type:Sequelize.INTEGER,primaryKey:true,autoIncreament: true},
  userName: Sequelize.STRING(500),
  mileage: Sequelize.INTEGER,
  userNumber: Sequelize.STRING(500),
  userPassword : Sequelize.STRING(500),
  //favoriteGu: Sequelize.STRING(500),
  //favoriteCategory: Sequelize.STRING(500),
  userEmail: Sequelize.STRING(500),
  userNickName: Sequelize.STRING(500),
  discountNotice: Sequelize.INTEGER,
  personalQuestionNotice: Sequelize.INTEGER,
  classTimeNotice: Sequelize.INTEGER,
  birthday: Sequelize.DATE,
  gender: Sequelize.STRING(500),
  age: Sequelize.INTEGER
},{timestamps:false});

const admins = sequelize.define('admins', {
  adminId: {type:Sequelize.INTEGER,primaryKey:true},
  userEmail: Sequelize.STRING
},{timestamps:false});

/*
const products = sequelize.define('products',{
  product_id : {type:Sequelize.INTEGER,primaryKey:true},
  product_name : Sequelize.STRING,
  product_price : Sequelize.STRING,
  product_memo : Sequelize.STRING,
  brand_id : Sequelize.INTEGER,
  image_url : Sequelize.STRING,
  shop_url : Sequelize.STRING,
  click_count : Sequelize.INTEGER,
  favorite_count : Sequelize.INTEGER,
},{timestamps:false});

const favorites = sequelize.define('favorites',{
  user_id : Sequelize.INTEGER,
  product_id : Sequelize.INTEGER
},{timestamps:false});
//favorites 테이블은 primaryKey가 없으므로, 따로 제거해주어야함.
favorites.removeAttribute('id');

const brands = sequelize.define('brands',{
  brand_id : {type:Sequelize.INTEGER,primaryKey:true},
  brand_name : Sequelize.STRING,
  brand_memo : Sequelize.STRING,
  brand_image_url : Sequelize.STRING,
  brand_clicked : Sequelize.INTEGER
},{timestamps:false});

const events = sequelize.define('events',{
  event_id : {type:Sequelize.INTEGER,primaryKey:true},
  user_id : Sequelize.INTEGER,
  event_name : Sequelize.STRING,
  event_person_name : Sequelize.STRING,
  event_person_birthday : Sequelize.DATE,
  event_person_gender : Sequelize.STRING,
  event_start : Sequelize.DATE,
  event_end : Sequelize.DATE,
  event_image_url : Sequelize.STRING,
  repeat_cycle : Sequelize.STRING,
  memo : Sequelize.STRING
},{timestamps:false});

const categorys = sequelize.define('categorys',{
  category_id : {type:Sequelize.INTEGER,primaryKey:true},
  category_name : Sequelize.STRING
},{timestamps:false});

const category_products = sequelize.define('category_products',{
  category_id : Sequelize.INTEGER,
  product_id : Sequelize.INTEGER
},{timestamps:false});
//category_products 테이블은 primaryKey가 없으므로, 따로 제거해주어야함.
category_products.removeAttribute('id');
*/


//users.sync();
//admins.sync();
/*products.sync();
favorites.sync();
brands.sync();
events.sync();
categorys.sync();
category_products.sync();
*/

/*테이블 관계 정의*/

//products.hasMany(favorites,{foreignKey:'product_id'});1:N 관계
//favorites.belongsTo(products,{foreignKey:'product_id',targetKey:'product_id'}); // N:1관계
//brands.hasMany(products,{foreignKey:'brand_id',targetKey:'brand_id'}); // N:1관계
//users.hasMany(brands,{foreignKey:'user_id',targetKey:'user_id'});
//category_products.belongsTo(products,{foreignKey:'product_id',targetKey:'product_id'});

//users.hasMany(favorites,{foreignKey:'user_id'});



module.exports.users = users;

//module.exports.products = products;
//module.exports.favorites = favorites;
//module.exports.brands = brands;
//module.exports.events = events;
//module.exports.categorys = categorys;
//module.exports.category_products = category_products;