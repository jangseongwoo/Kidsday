const RDS = require('../RDS_INFO');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  RDS.database, // 데이터베이스 이름
  RDS.user, // 유저 명
  RDS.password, // 비밀번호
  {
    'host': RDS.host, // 데이터베이스 호스트
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  }
);

module.exports = sequelize;