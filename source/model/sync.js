const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const sequelize = require('./dbConnect');

const reviews = require('./reviews.js').reviews;
const payments = require('./payments.js').payments;
const reservationClasses = require('./reservationClasses.js').reservationClasses;
const reservationVisits = require('./reservationVisits.js').reservationVisits;
const likePrograms = require('./likePrograms.js').likePrograms;
const mileages = require('./mileages.js').mileages;
const detailInfos = require('./detailInfos.js').detailInfos;
const dates = require('./dates.js').dates;
const favoriteCategorys = require('./favoriteCategorys.js').favoriteCategorys;
const messages = require('./messages.js').messages;
const users = require('./users.js').users;
const childs = require('./childs.js').childs;
const programs = require('./programs.js').programs;
const teachClasses = require('./teachClasses.js').teachClasses;
const teachers = require('./teachers.js').teachers;
const themas = require('./themas.js').themas;
const representations = require('./representations.js').representations;
const favoriteCitys = require('./favoriteCitys.js').favoriteCitys;

console.log('테이블 생성완료');


users.hasMany(payments,{foreignKey:'userId'});
//payments.belongsTo(users);
users.hasMany(reservationClasses,{foreignKey:'userId'});
users.hasMany(reservationVisits,{foreignKey:'userId'});
users.hasMany(likePrograms,{foreignKey:'userId'});
users.hasMany(mileages,{foreignKey:'userId'});
users.hasMany(childs,{foreignKey:'userId'});
//users.hasMany(messages,{foreignKey:'fromUserId'});
users.hasMany(messages,{foreignKey:'fromUserId'});
users.hasMany(favoriteCategorys,{foreignKey:'userId'});
users.hasOne(reviews, {foreignKey:'userId'});
reviews.belongsTo(users,{foreignKey:'userId'});
//console.log('user까지 완료');

//likePrograms.hasMany(programs,{foreignKey:'programId'});
themas.hasMany(programs,{foreignKey:'themaId'});
teachers.hasMany(teachClasses,{foreignKey:'teacherId'});
//programs.hasMany(programs,{foreignKey:'programId'});
programs.hasMany(reviews,{foreignKey:'programId'});
programs.hasMany(detailInfos,{foreignKey:'programId'});
programs.hasMany(dates,{foreignKey:'programId'});
programs.hasMany(reservationClasses,{foreignKey:'programId'});
programs.hasMany(likePrograms,{foreignKey:'programId'});

//messages.hasOne(programs);

likePrograms.belongsTo(programs,{foreignKey:'programId'});
likePrograms.belongsTo(users,{foreignKey:'userId'});
//programs.hasMany(likePrograms,{foreignKey:'programId'});
representations.hasMany(programs,{foreignKey:'programId'});
reservationClasses.hasOne(dates,{foreignKey:'dateId'});
console.log('외래키 관계 설정 완료');


sequelize.sync();
