const Sequelize = require('sequelize');
const express = require('express');

const reviewRouter = express.Router();
const Reviews = require('../model/reviews.js').reviews;
const Users = require('../model/users.js').users;
console.log('reviews Router 시작합니다.');


reviewRouter.route('/programs/reviews')
    .post(addReview);

reviewRouter.route('/programs/reviews/:programId')
    .get(sendReviewsList)
    .delete(deleteRiview);

function addReview(req, res, next) {
    var review = {};

    for (i in req.body) {
        console.log(req.body[i]);
        review[i] = req.body[i];
    }
    Reviews.create(review).then(results => {
        // res.sendStatus(200);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function sendReviewsList(req, res, next) {
    Reviews.findAll({
        include : {model:Users, attributes: ['userNickName'] },
        where: { programId: req.params.programId }
    }).then(result => {
        console.log(result);
        res.send(result);
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function deleteRiview(req, res, next) {
    Reviews.destroy({
        where: { programId: req.params.programId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

module.exports = reviewRouter;