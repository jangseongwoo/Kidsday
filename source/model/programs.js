const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');
const reviews = require('../model/reviews.js').reviews;
const detailInfos = require('../model/detailInfos.js').detailInfos;
const dates = require('../model/dates.js').dates;
const sequelize = require('./dbConnect');

const programs = sequelize.define('programs', {
    programId: { type: Sequelize.INTEGER, primaryKey: true,autoIncreament: true },
    programName: Sequelize.STRING(500),
    programStatus: Sequelize.STRING(500),
    originPrice: Sequelize.INTEGER,
    registerDate: Sequelize.DATE,
    concomitantPerson: Sequelize.STRING(500),
    recommandAge: Sequelize.STRING(500),
    programCategory: Sequelize.STRING(500),
    priceDiscount: Sequelize.INTEGER,
    city: Sequelize.STRING(500),
    userClick: Sequelize.INTEGER,
    thumbnailURL: Sequelize.STRING(500),
    teacherURL: Sequelize.STRING(500),
    programPublic: Sequelize.INTEGER,
    programSubName: Sequelize.STRING(500),
    teacherName: Sequelize.STRING(500),
    reservationLimitPeople: Sequelize.INTEGER,
    address: Sequelize.STRING(500),
    themaId: Sequelize.INTEGER,
    etcInfo: Sequelize.STRING(500),
    convenienceInfo: Sequelize.STRING(500), 
    minimumPerson: Sequelize.STRING(500),
    teacherRecord: Sequelize.STRING(500),
    possibleVisit: Sequelize.STRING(500),
    gu: Sequelize.STRING(500),
    representationId: Sequelize.INTEGER,
    addressGeo: Sequelize.GEOMETRY('POINT')
}, { timestamps: false } );
//{freezeTableName:true}
//programs.sync();


/*테이블 관계 정의*/

//products.hasMany(favorites,{foreignKey:'product_id'});1:N 관계
//favorites.belongsTo(products,{foreignKey:'product_id',targetKey:'product_id'}); // 1:1관계
//brands.hasMany(products,{foreignKey:'brand_id',targetKey:'brand_id'}); // N:1관계
//users.hasMany(brands,{foreignKey:'user_id',targetKey:'user_id'});
//category_products.belongsToMany(products,{foreignKey:'product_id',targetKey:'product_id'})N:M;

//users.hasMany(favorites,{foreignKey:'user_id'});



module.exports.programs= programs;

