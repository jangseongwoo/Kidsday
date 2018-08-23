const Sequelize = require('sequelize');
const express = require('express');



const userRouter = express.Router();

const Users = require('../model/users.js').users;
const ReservationClasses = require('../model/reservationClasses.js').reservationClasses;
const Messages = require('../model/messages.js').messages;
const Like = require('../model/likePrograms.js').likePrograms;
const Program = require('../model/programs.js').programs;
const Childs = require('../model/childs.js').childs;
const FavoriteCategory = require('../model/favoriteCategorys.js').favoriteCategorys;
const Teachers = require('../model/teachers.js').teachers;

console.log('User Router 시작합니다.');


//-----MY PAGE API----//
userRouter.route('/users/myPage/info/childInfo')
    .post(editUserChildInfo);

userRouter.route('/users/myPage/info/childInfo/:userId')
    .get(sendUserChildInfo);

userRouter.route('/users/myPage/info/userInfo')
    .post(editUserInfo);

userRouter.route('/users/myPage/info/:userId')
    .get(sendUserInfo);

userRouter.route('/users/myPage/ticket/:userId')
    .get(sendTicketDetail);

userRouter.route('/users/myPage/mileage/:userId')
    .get(sendMileageDetail);

userRouter.route('/users/myPage/:userId')
    .get(sendUserDetail)
    .delete(deleteUser)
    .put(editUser);

userRouter.route('/users/myPage/notice/:userId')
    .get(sendUserNotice);

userRouter.route('/users/myPage/notice/')
    .post(editUserNotice);

//-----JOIN API----//
userRouter.route('/users/join')
    .post(addUsers);


//-----QUESTION API----//
userRouter.route('/users/question/:userId')
    .get(sendQuestionList);

userRouter.route('/users/question/:userId/:programId')
    .get(sendQuestionDetail);

userRouter.route('/users/question/')
    .post(addQuestionMessage);

//userRouter.route('/users/question/')
//  .get(sendQuestionDetail);

//-----LIKE API----//
userRouter.route('/users/like')
    .post(addLikeProgram)
    .put(updateLikeProgram)
    .delete(deleteLikeProgram);

userRouter.route('/users/like/:userId')
    .get(sendLikeProgram);

//-----------------------------------------Funtion------------------------------------------//

async function addQuestionMessage(req, res, next) {
    console.log('addQuestionMessage 시작합니다.');
    let result;
    try {
        console.log(req.params.userId);
        result = await Messages.create(req.body);
        res.send('OK');
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);
    }
}

//sendUserChildInfo
async function sendUserChildInfo(req, res, next) {
    console.log('sendUserChildInfo 시작합니다.');
    console.log(req.params.userId);
    let result;
    try {
        result = await Users.findOne({
            include: [{ model: Childs }, { model: FavoriteCategory }],
            where: { userId: req.params.userId },
            //attributes: []
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

function deleteLikeProgram(req, res, next) {
    Like.destroy({
        where: { userId: req.body.userId, programId: req.body.programId }
    }).then(result => {
        console.log(req.body.userId)
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

async function updateLikeProgram(req, res, next) {
    console.log('updateLikeProgram 시작합니다.');
    var userNotice = {};
    var result = {};

    for (i in req.body) {
        console.log(req.body[i]);
        userNotice[i] = req.body[i];
    }
    try {
        result = await Like.update({
            like: req.body.like
        },
            {
                where: { userId: req.body.userId, programId: req.body.programId }
            });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

//await Program.update({ addressGeo: gAdd }, { where: { programId: 38 } });

async function sendLikeProgram(req, res, next) {
    console.log('sendLikeProgram 시작합니다.');
    var likePro = {};
    //var result = {};
    //where :{ programId : Like.programId}
    // userId -> likeProgram -> program Detail 
    try {
        // program + likePrograms / 중복 제거 
        //result = await Users
        //result.all = await Like.findAll({where : {userId : req.params.userId}});
        // result = await Like.findAll({
        //     where: { userId: req.params.userId },
        //     include: [{
        //         model: Program,
        //         attributes: ['programName']
        //     }],
        //     attributes: ['userId']
        // });


        // var proId = []
        // for (let i of result) {
        //     if (!proId.includes(i.programId))
        //         proId.push(i.programId)
        // }
        // result2 = await Program.findAll({
        //     where: { programId: proId }
        // })
        // console.log(proId)

        result = await Like.findAll({ where: { userId: req.params.userId }, include: [{ model: Program }], attributes: [] });

        //var test = await Program.findAll({where :{programId:1}})
        //console.log(test);
        res.send(result);
        // console.log(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);
    }
}

async function addLikeProgram(req, res, next) {
    console.log('addLikeProgram 시작합니다.');

    var like = {};

    for (i in req.body) {
        console.log(req.body[i]);
        like[i] = req.body[i];
    }

    try {
        result = await Like.create(like);
        res.send('OK');
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function editUserNotice(req, res, next) {
    console.log('editUserNotice 시작합니다.');
    var userNotice = {};
    for (i in req.body) {
        console.log(req.body[i]);
        userNotice[i] = req.body[i];
    }
    try {
        result = await Users.update({
            attributes: ['discountNotice', 'personalQuestionNotice', 'classTimeNotice'],
            where: { userId: req.body.userId }
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}


async function sendUserNotice(req, res, next) {
    console.log('sendUserNotice 시작합니다.');
    console.log(req.params.userId);
    let result;
    try {
        result = await Users.findOne({
            attributes: ['discountNotice', 'personalQuestionNotice', 'classTimeNotice'],
            where: { userId: req.params.userId }
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function sendQuestionList(req, res, next) {
    console.log('sendQuestionList 시작합니다.');
    console.log(req.params.userId);
    let result = {};
    try {
        // result = await Message({
        //     where: { $or: 
        //         [{ fromUserId: req.params.userId}, {toUserId: req.params.userId }] },
        //     order: 'time DESC',
        //     //limit: 1,
        //     distinct: 'programId'
        // });
        if (req.params.userId < 100) {
            result.message = await Messages.sequelize.query("select *,(select teacherName from programs as mm where m.programId = mm.programId ) as teacherName from (select * from messages where fromUserId = :userId or toUserId = :userId order by time desc) as m group by m.programId",
                { replacements: { userId: req.params.userId } });
            result.message = result.message[0];
            result.teacher = await Teachers.sequelize.query("select teacherId from teachers where teacherName = :teacherName",{replacements: {teacherName : result.message[0].teacherName}});
            result.teacher = result.teacher[0];
        }
        else{
            result.message = await Messages.sequelize.query("select *,(select teacherName from programs as mm where m.programId = mm.programId ) as teacherName from (select * from messages where fromUserId = :userId or toUserId = :userId order by time desc) as m group by m.programId",
                { replacements: { userId: req.params.userId } });
            result.message = result.message[0];
            result.teacher = await Users.findOne({ attributes: ['userId'] }, { where: { userId: result.message[0].userId } });
        }


        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function sendQuestionDetail(req, res, next) {
    console.log('sendQuestionDetail 시작합니다.');
    console.log(req.params.programId);
    console.log(req.params.userId);
    var result = {};
    var teacherId = 0;
    try {
        if (req.params.userId >= 100) {
            // result.messageDetail = await Messages.findAll({
            //     where: {
            //         $and: [{ programId: req.params.programId }, { toUserId: req.params.userId }],
            //         $and: [{ programId: req.params.programId }, { fromUserId: req.params.userId }]
            //     }, order: 'time DESC'
            // });
            result.messageDetail = await Messages.sequelize.query(
                "select * from messages where (programId = :programId and fromUserId = :userId)  or (programId = :programId and toUserId = :userId ) order by time desc",
                { replacements: { programId: req.params.programId, userId: req.params.userId } });

            for (i in result.messageDetail) {
                if (result.messageDetail[i].fromUserId < 100) {
                    teacherId = result.messageDetail[i].fromUserId;
                    break;
                }


                if (result.messageDetail[i].toUserId < 100) {
                    teacherId = result.messageDetail[i].toUserId;
                    break;
                }
                //console.log('result.messageDetail[i] :', + result.messageDetail[i].fromUserId,i);
            }
            //console.log('result.messageDetail[0] :' + result.messageDetail[0].fromUserId);
            console.log("teacherId" + teacherId);
            //result.userName = await Users.sequelize.query("select userName from users where userId = :userId limit 1", { replacements: { userId: teacherId } });
            //result.userName = result.userName[0];
            result.messageDetail = result.messageDetail[0];
        }
        else {
            result.messageDetail = await Messages.sequelize.query(
                "select * from messages where (programId = :programId and fromUserId = :userId)  or (programId = :programId and toUserId = :userId ) order by time desc",
                { replacements: { programId: req.params.programId, userId: req.params.userId } });
            for (i in result.messageDetail) {
                if (result.messageDetail[i].fromUserId >= 100) {
                    teacherId = result.messageDetail[i].fromUserId;
                    break;
                }

                if (result.messageDetail[i].toUserId >= 100) {
                    teacherId = result.messageDetail[i].toUserId;
                    break;
                }
            }
            //result.teacher = await Program.findOne({ attributes: ['teacherName'] }, { where: { programId: req.params.programId } });
            //result.teacherId = teacherId;//await Teachers.findOne({where : {teacherId : teacherId }});
            result.messageDetail = result.messageDetail[0];
        }

        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function editUserInfo(req, res, next) {
    console.log('editUserInfo 시작합니다.');
    let result;
    try {
        console.log(req.body.userId);
        result = await Users.update({
            userPassword: req.body.userPassword, userNumber: req.body.userNumber
        }, //attributes : ['userPassword','userNumber'],
            {
                where: { userId: req.body.userId }
            });

        res.send('OK');
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);
    }
}

async function editUserChildInfo(req, res, next) {
    console.log('editUserChildInfo 시작합니다.');
    let result;
    let category = req.body.category instanceof Array ? req.body.category : [req.body.category]
    console.log('category : ', category);
    try {
        result = await Users.update({
            birthday: req.body.birthday, gender: req.body.gender,
        },  //attributes : ['birthday','gender'],
            { where: { userId: req.body.userId } }
        );
        for (i in req.body.category) {
            await FavoriteCategory.create({
                userId: req.body.userId, category: req.body.category[i]
            });
        }
        res.send('OK');
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}


async function sendUserInfo(req, res, next) {
    console.log('sendUserInfo 시작합니다.');
    let result;
    try {
        console.log(req.params.userId);
        result = await Users.findOne({
            where: { userId: req.params.userId }
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

async function sendMileageDetail(req, res, next) {
    console.log('sendMileageDetail 시작합니다.');
    let result;
    try {
        console.log(req.params.userId);
        result = await Mileage.findAll({
            where: { userId: req.params.userId }
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}


function addUsers(req, res, next) {
    var user = {};

    for (i in req.body) {
        console.log(req.body[i]);
        user[i] = req.body[i];
    }
    Users.create(user).then(results => {
        // res.sendStatus(200);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}


async function sendTicketDetail(req, res, next) {
    console.log('sendTicketDetail 시작합니다.');
    let result;
    try {
        console.log(req.params.userId);
        result = await ReservationClasses.count({
            where: { userId: req.params.userId }
        });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}


async function sendUserDetail(req, res, next) {
    console.log('sendUserDetail 시작합니다.');
    let result;
    try {
        console.log(req.params.userId);
        result.user = await Users.findOne(
            {
                where: { userId: req.params.userId }
            });
        result.ticket = await ReservationClasses.count({
            where: { userId: req.params.userId }
        });

        result.mileage = await Mileage.findOne({
            where: { userId: req.params.userId }
        });

        //result = await Program.findAll({ order: 'userClick DESC', limit: 12 });
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);

    }
}

function editUser(req, res, next) {
    var user = {};
    for (i in req.body) {
        console.log(req.body[i]);
        user[i] = req.body[i];
    }

    Users.update(req.body, {
        where:
        { userId: req.body.userId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}


function deleteUser(req, res, next) {
    Users.destroy({
        where: { userId: req.params.userId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

module.exports = userRouter;