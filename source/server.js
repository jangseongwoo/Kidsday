const express = require('express');

const app = express();
const RDS = require('./RDS_INFO');
var bodyParser = require('body-parser');
const sequelize = require('./model/dbConnect');
const Sequelize = require('sequelize');
const geocoder = require('./model/geo.js').geocoder;
const Program = require('./model/programs.js').programs;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));


console.log('-----------injection------------');

const sync = require('./model/sync.js').sync;

app.use(require('./router/userRouter.js'));
app.use(require('./router/programRouter.js'));
app.use(require('./router/teacherRouter.js'));
app.use(require('./router/themaRouter.js'));
app.use(require('./router/reviewRouter.js'));

// async function makeGeo() {
//     try {
//         var address = await Program.findAll({ attributes: ['address'] });
//         //console.log(address.address);
//         //var sAddress = address.address.toString();
//         //result = await geocoder.geocode(address[i].address);
//         result = await geocoder.geocode('강남구 테헤란로25길 15-5');
//         var gAdd = { type: 'Point', coordinates: [result[0].latitude, result[0].longitude] }
//         await Program.update({ addressGeo: gAdd }, { where: { programId: 38 } });
//     }
//     catch (error) {  
//         console.log(error);
//     }
// }
// makeGeo();


/*
app.get('/', (req, res) => {
   res.sendFile('./public/index.html');
});
*/

app.use(function (error, req, res, next) {
    console.log('Error : ', error);
    res.send({ error: error.message });
});

console.log('-----------KidsDay 서버가 시작합니다.------------');
app.listen(3000);