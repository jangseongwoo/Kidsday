const Sequelize = require('sequelize');
const express = require('express');

const teacherRouter = express.Router();
const Teachers = require('../model/teachers.js').teachers;
console.log('teacher Router 시작합니다.');


teacherRouter.route('/teachers')
    .delete(deleteTeacher)
    .get(sendTeacherDetail)
    .post(addTeacher);

function addTeacher(req, res, next) {
    var teacher = {};

    for (i in req.body) {
        console.log(req.body[i]);
        teacher[i] = req.body[i];
    }
    Teachers.create(teacher).then(results => {
        // res.sendStatus(200);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function sendTeacherDetail(req, res, next) {
    Teacher.findOne({
        where: { teacherId: req.params.teacherId }
    }).then(result => {
        console.log(result);
        res.send(result);
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function deleteTeacher(req, res, next) {
    Teacher.destroy({
        where: { teacherId: req.params.teacherId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

module.exports = teacherRouter;