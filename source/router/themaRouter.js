const Sequelize = require('sequelize');
const express = require('express');

const themaRouter = express.Router();

const Themas = require('../model/themas.js').themas;
const Programs = require('../model/programs.js').programs;
const Representations = require('../model/representations.js').representations;

console.log('themaRouter 시작합니다.');

//--------------------------------------------------------------------------------------------------------------//

themaRouter.route('/themas')
    .get(sendThemaNonMember)
    .post(addThema)
    .put(editThema)
    .delete(deleteThema);

themaRouter.route('/themas/:userId')
    .get(sendThemaMember);

themaRouter.route('/themas/:themaId')
    .get(sendThemaDetail);

themaRouter.route('/representation/:representationId')
    .get(sendRepresentationDetail);
    
//--------------------------------------------------------------------------------------------------------------//

async function sendThemaMember(req, res, next) {
    console.log('sendThemaMember 시작합니다.');
    var category1 = '과학';
    var category2 = '자연';
    var result = {};
    var recommand = {}; 
    try {
        //let representations = await Programs.findAll({where : {representationId : 1}});
        //  recommand = 
        //let thema3 = await Programs.sequelize.query("seect * from programs where (programCategory = '과학' and city = '서울' and recommandAge = '만8세~9세') or (programCategory = '과학' and city='서울') or (city='서울' and recommandAge='만8세~9세') group by programId limit 6");
        let thema1 = await Programs.findAll({ order: 'userClick DESC', limit: 6 });
        let thema2 = await Programs.findAll({ order: 'registerDate DESC', limit: 6 });
        let thema3 = await Programs.findAll({ where: { programCategory: category1 }, order: 'userClick DESC', limit: 6 });
        let thema4 = await Programs.findAll({ where: { programCategory: category2 }, order: 'userClick DESC', limit: 6 });
        let thema5 = await Programs.findAll({ where: { themaId: 0 }, order: 'userClick DESC', limit: 6 });
        
        result.popular = thema1;
        result.date = thema2;
        result.category1 = thema3;
        result.category2 = thema4;
        result.admin = thema5;
        //result.representations = representations;
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);
    }
}



function addThema(req, res, next) {
    console.log('addThema 시작합니다.');
    var thema = {};

    for (i in req.body) {
        console.log(req.body[i]);
        thema[i] = req.body[i];
    }
    Themas.create(thema).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

async function sendThemaNonMember(req, res, next) {
    console.log('sendThemaNonMember 시작합니다.');
    var category1 = '과학';
    var category2 = '자연';
    var result = {};

    try {
        //let representations = await Programs.findAll({where : {representationId : 1}});
        let thema1 = await Programs.findAll({ order: 'userClick DESC', limit: 6 });
        let thema2 = await Programs.findAll({ order: 'registerDate DESC', limit: 6 });
        let thema3 = await Programs.findAll({ where: { programCategory: category1 }, order: 'userClick DESC', limit: 6 });
        let thema4 = await Programs.findAll({ where: { programCategory: category2 }, order: 'userClick DESC', limit: 6 });
        let thema5 = await Programs.findAll({ where: { themaId: 0 }, order: 'userClick DESC', limit: 6 });
        
        result.popular = thema1;
        result.date = thema2;
        result.category1 = thema3;
        result.category2 = thema4;
        result.admin = thema5;
        //result.representations = representations;
        res.send(result);
    }
    catch (error) {
        // res.send(result);
        console.log(error);
        res.status(404).send(error);
    }
}


function editThema(req, res, next) {
    Themas.update(req.body, {
        where:
        { themaId: req.body.themaId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

function deleteThema(req, res, next) {
    Themas.destroy({
        where: { themaId: req.body.themaId }
    }).then(result => {
        console.log(result);
        res.send('OK');
    }, error => {
        console.log(error);
        res.send(error);
    });
}

async function sendRepresentationDetail(req, res, next) {
    const rId = req.params.representationId;
    console.log(rId);

    try{
        let result = await Programs.findAll({where:{representationId :rId}, order:'userClick DESC'});
        res.send(result);
    }
    catch(error){
        console.log(error);
        res.status(404).send(error);
    }
    
}

async function sendThemaDetail(req, res, next) {
    const themaId = req.params.themaId;
    console.log(req.params.themaId);
    console.log(themaId);

    try{
        let result = await Programs.findAll({where:{themaId:req.params.themaId}, order:'userClick DESC'});
        res.send(result);
    }
    catch(error){
        console.log(error);
        res.status(404).send(error);
    }
    
}

module.exports = themaRouter;