const Sequelize = require('sequelize');
const express = require('express');

const programRouter = express.Router();

const Program = require('../model/programs.js').programs;
const dates = require('../model/dates.js').dates;
const ReservationVisits = require('../model/reservationVisits.js').reservationVisits;
const ReservationClasses = require('../model/reservationClasses.js').reservationClasses;
const Payments = require('../model/payments.js').payments;
const DetailInfos = require('../model/detailInfos.js').detailInfos;
const Like = require('../model/likePrograms.js').likePrograms;


console.log('ProgramRouter 시작합니다.');

//--------------------------------------ROUTER-------------------------------------------//

programRouter.route('/programs/booking')
    .post(payment);

programRouter.route('/programs/booking/:userId')
    .get(sendMyReservation);

programRouter.route('/programs/booking/possible/:programId')
    .get(sendPossibleDate);

programRouter.route('/programs/search')
    .post(searchProgram);

programRouter.route('/programs/search/:category/:order/:userId')
    .get(sendProgramSearchList);

programRouter.route('/programs/visitApply')
    .post(addVisitApply);

programRouter.route('/programs/classApply')
    .post(addClassApply);

programRouter.route('/programs')
    //.get(sendProgramDetailNonMember)
    .post(addPrograms)
    .put(editProgram);

programRouter.route('/programs/:programId')
    .get(sendProgramDetail)
    .delete(deleteProgram);

//----------------------------------------함수 부분---------------------------------------------//

async function sendMyReservation(req, res, next) {
    console.log('sendMyReservation 시작합니다.');
    const userId = req.params.userId;
    console.log(userId);
    var result = {};

    try {
        result.ReservationClasses = await ReservationClasses.findAll({ where: { userId: userId } });
        result.ReservationVisits = await ReservationVisits.findAll({ where: { userId: userId } });
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

async function payment(req, res, next) {
    console.log('payment 시작합니다.');
    var payment = {};
    for (i in req.body) {
        payment[i] = req.body[i];
    }

    try {
        result = await Payments.create(payment);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

async function addClassApply(req, res, next) {
    console.log('addClassApply 시작합니다.');
    // for (i in req.body) {
    //     console.log(req.body[i]);
    //     apply[i] = req.body[i];
    // }
    // if( (!req.body.programId) || (!req.body.userId) || (!req.body.deposit) || (!req.body.dateId) || (!req.body.peopleNumber)
    //  || (!req.body.userName) || (!req.body.payDate)|| (!req.body.programName) || (!req.body.paymentWay) || (!req.body.money) || (!req.body.depositorName)){
    //     res.status(300).send("입력값 오류, 입력해야 되는 값이 안들어왔어요");
    // }
  
    try {
        await ReservationClasses.create({
            programId: req.body.programId,
            userId: req.body.userId,
            deposit: req.body.deposit,
            dateId: req.body.dateId,
            peopleNumber:req.body.peopleNumber,
            userName: req.body.userName,
            userPhoneNumber: req.body.userPhoneNumber
        });
        await Payments.create({
            payDate: req.body.payDate,
            programId: req.body.programId,
            programName: req.body.programName,
            userId: req.body.userId,
            paymentWay: req.body.paymentWay,
            money: req.body.money,
            depositorName: req.body.depositorName,
            useMileage: req.body.useMileage
        });
        res.send('OK');
    }
    catch (error) {
        res.status(400).send(error);
    }
    // reservationClasses.create(apply).then(result => {
    //     console.log(result);
    //     res.send('OK');
    // }, error => {
    //     console.log(error);
    //     res.send(error);
    // });
}

function addVisitApply(req, res, next) {
    console.log('addVisitApply 시작합니다.');
    var apply = {};

    for (i in req.body) {
        console.log(req.body[i]);
        apply[i] = req.body[i];
    }
    ReservationVisits.create(apply).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}


async function sendPossibleDate(req, res, next) {
    console.log('sendPossibleDate 시작합니다.');
    let result;
    var program = {};

    try {
        console.log(req.params.programId);

        program = await Program.findOne({
            where: { programId: req.params.programId }
        });

        //console.log('-----reserverationNumber'+program.reservationLimitPeople);

        result = await dates.findAll(
            {
                where: { programId: req.params.programId, currentReservationNumber: { $lt: program.reservationLimitPeople } },
                order: 'time DESC', //limit: 12
            });

        //const rrr = {cout:result.length, data:result, paging:{current:1, max:10, keyword:'111'}};
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function searchProgram(req, res, next) {
    console.log('searchProgram 시작합니다.');
    let result;

    try {
        switch (req.body.order) {
            case 'popular':
                console.log(req.body.order);
                console.log(req.body.programName);
                // result = await Program.findAll(
                //     {
                //         //attributes:[[sequelize.query('select 1 from likePrograms as l, users as u where ')]],
                //         include: { model: Like, where: { programId: req.body.programId, userId: req.body.userId } },
                //         where: { programName: { like: '%' + req.body.programName + '%' } },
                //         order: 'userClick DESC', limit: 12
                //     });
                result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programName LIKE :programName order by userClick",
                    { replacements: { userId: req.body.userId, programName: '%' + req.body.programName + '%' } });
                result = result[0];
                break;
            case 'latest':
                console.log(req.body.order);
                console.log(req.body.programName);
                // result = await Program.findAll(
                //     {
                //         where: { programName: { like: '%' + req.body.programName + '%' } },
                //         order: 'registerDate DESC', limit: 12
                //     });
                result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programName LIKE :programName order by registerDate",
                    { replacements: { userId: req.body.userId, programName: '%' + req.body.programName + '%' } });
                result = result[0];
                break;
            case 'cheapPrice':
                console.log(req.body.order);
                console.log(req.body.programName);
                // result = await Program.findAll(
                //     {
                //         where: { programName: { like: '%' + req.body.programName + '%' } },
                //         order: 'priceDiscount DESC', limit: 12
                //     });
                result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programName LIKE :programName order by priceDiscount",
                    { replacements: { userId: req.body.userId, programName: '%' + req.body.programName + '%' } });
                result = result[0];
                break;
            /*     case 'deadLine':
                       console.log(req.body.order);
                       console.log(req.body.programName);
                       result = await Program.findAll(
                           {
                               where: { programName: { like: '%' + req.body.programName + '%' } },
                               order: 'userClick DESC', limit: 12
                           });
                       break;
                       */
            case 'gps':
                console.log(req.body.order);
                console.log(req.body.programName);
                //var test = await Program.findOne({where : {programId : 1}});
                //let addressTxt = `POINT(${test.addressGeo.coordinates[0]} ${test.addressGeo.coordinates[1]})`;
                let addressTxt = `POINT(${req.body.geoX} ${req.body.geoY})`;
                // result = await Program.findAll(
                //     {
                //         where: { programName: { like: '%' + req.body.programName + '%' } },
                //         order: [[Program.sequelize.fn('ST_DISTANCE', Program.sequelize.col('addressGeo'), Program.sequelize.fn('ST_GeomFromText', addressTxt)), 'ASC']],
                //         limit: 12
                //     });
                //result= await Program.fn('ST_DISTANCE', Program.Sequelize.col('address'), Program.Sequelize.fn('ST_GeomFromText',Program.findA));
                //result = await Program.sequelize.fn('ST_DISTANCE', Program.sequelize.col('addressGeo'), Program.sequelize.fn('ST_GeomFromText', test.addressGeo));
                result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programName LIKE :programName order by ST_DISTANCE(ST_GeomFromText(:addressT),addressGeo)",
                    { replacements: { userId: req.body.userId, programName: '%' + req.body.programName + '%', addressT: addressTxt } });


                //select ST_DISTANCE(POINT(12.13,134.2),addressGeo) from programs as p order by ST_DISTANCE(ST_GeomFromText(:addressT),addressGeo)
                //console.log('result : ', result);
                //console.log('result1 : ', result[1]);

                result = result[0];

                break;
            //order: Program.sequelize.fn('ST_DISTANCE', Program.sequelize.col('addressGeo'), Program.sequelize.fn('ST_GeomFromText', test.addressGeo)),

            default:
                break;
        }

        //result = await Program.findAll({ order: 'userClick DESC', limit: 12 });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

function addPrograms(req, res, next) {
    console.log('ProgramAdd 시작합니다.');
    var program = {};

    for (i in req.body) {
        console.log(req.body[i]);
        program[i] = req.body[i];
    }
    Program.create(program).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

async function sendProgramSearchList(req, res, next) {
    console.log('sendProgramSearchList 시작합니다.');
    console.log(req.params.category);
    console.log(req.params.userId);

    var category = req.params.category;
    var orderCategory = req.params.order;

    switch (category) {
        case 'science':
            category = '과학';
            break;

        case 'body':
            category = '신체';
            break;

        case 'cook':
            category = '요리';
            break;

        case 'art':
            category = '예술';
            break;

        case 'comprehensiveDevelopment':
            category = '종합발달';
            break;

        case 'all':
            category = 'all';
            break;


        default:
            break;
    }

    let result;
    try {
        if (category == 'all') {
            switch (orderCategory) {
                case 'popular':
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p order by userClick",
                        { replacements: { userId: req.params.userId } });
                    result = result[0];
                    break;
                case 'latest':
                    //result = await Program.findAll({ order: 'registerDate DESC', limit: 12 });
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p order by registerDate",
                        { replacements: { userId: req.params.userId } });
                    result = result[0];
                    break;
                case 'cheapPrice':
                    //result = await Program.findAll({ order: 'priceDiscount ASC', limit: 12 });
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p order by priceDiscount",
                        { replacements: { userId: req.params.userId } });
                    result = result[0];
                    break;
                default:
                    break;
            }
        }
        else {
            switch (orderCategory) {
                case 'popular':
                    //result = await Program.findAll({ where: { programCategory: category }, order: 'userClick DESC', limit: 12 });
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programCategory = :programCategory order by userClick",
                        { replacements: { userId: req.params.userId, programCategory: category } });
                    result = result[0];
                    break;
                case 'latest':
                    //result = await Program.findAll({ where: { programCategory: category }, order: 'registerDate DESC', limit: 12 });
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programCategory = :programCategory order by registerDate",
                        { replacements: { userId: req.params.userId, programCategory: category } });
                    result = result[0];
                    break;
                case 'cheapPrice':
                    //result = await Program.findAll({ where: { programCategory: category }, order: 'priceDiscount DESC', limit: 12 });
                    result = await Program.sequelize.query("select p.* , case when exists (select 1 from programs as pp, likePrograms as l where l.programId = pp.programId and pp.programId = p.programId and l.userId = :userId) then 1 else 2 end as iLike from programs as p where programCategory = :programCategory order by priceDiscount",
                        { replacements: { userId: req.params.userId, programCategory: category } });
                    result = result[0];
                    break;
                default:
                    break;
            }
        }


        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

function editProgram(req, res, next) {
    var program = {};
    for (i in req.body) {
        console.log(req.body[i]);
        program[i] = req.body[i];
    }

    Program.update(req.body, {
        where:
        { programId: req.body.programId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function deleteProgram(req, res, next) {
    Program.destroy({
        where: { programId: req.params.programId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}


async function sendProgramDetail(req, res, next) {
    console.log('sendProgramDetail 시작합니다.');
    const programId = req.params.programId;
    console.log(req.params.programId);
    let result = {};
    try {
        result = await Program.findOne({
            where: { programId: programId },
            include: { model: DetailInfos }
        });
        result = result instanceof Array ? result : [result];
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
module.exports = programRouter;
