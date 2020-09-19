//IMPORT
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');

const ModelDev = require('../models/Dev');
require('dotenv/config');

// REGEX SECURITY
const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;
const REGEX_NAME = /^[\w'\-,.]*[^_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/ ;

module.exports = {



    findOneUser : (req, res) => {
        const findUser = ModelDev.find({_id: req.params.id })
        .then( result => {
            if(result.length == 0) { return res.status(400).json({"error":"Aucun utilisateur"})}
            res.status(200).json(result);
        })
        .catch( error => res.status(400).json(error));
    },

    findAllUsers : (req, res) => {
        const usersList = ModelDev.find()
         .then( result => {
             if(result.length == 0 ) { return res.status(400).json({"error": "Aucun utilisateur"})}
         })
         .catch(error  => res.status(400).json({"error" : error}));
    },

    addNewUser : (req,res) => {
        ModelDev.find({mail: req.body.mail})
        .then( result => {
            if(result.length != 0) { return res.status(400).json({"error": "mail existe déjà"})};
            if(REGEX_EMAIL.test(req.body.mail) === false) { return res.status(400).json({"error": "Email non valide"})};
            if(REGEX_PASSWORD.test(req.body.password) === false) { return res.status(400).json({"error": "Mot de passe non valide"})};
            if(REGEX_NAME.test(req.body.name) === false) { return res.status(400).json({"error": "Username non valide"})};
            bcrypt.hash(req.body.password,10)
            .then( hash => {
                const newUser = new ModelDev({
                    mail     : req.body.mail,
                    username : req.body.username,
                    password : hash
                });
                newUser.save()
                .then( saveUser => res.status(200).json(saveUser))
                .catch( error => res.status(400).json({"error" : "400"}));
            })
            .catch( error => res.status(400).json({"error": "400"}))
        })
    },

    deleteUser : (req, res) => {
        const findUser = ModelDev.findByIdAndDelete(req.params.id)
        .then( result => {
            res.status(200).json({"Validation" : "Utilisateur supprimé"})
        })
        .catch( error => {
            res.status(400).json({"error": error});
        });
    },

    updateUser : (req, res) => {
        const findUser = ModelDev.findByIdAndUpdate(req.params.id, req.body)
        .then( result => {
            if(!result) { return res.status(400).json({"error":"aucun utilisateur"})};
            res.status(200).json({"validation" : result});
        })
        .catch( error => {
            res.status(400).json({"error":"400"});
        });
    },

    login : (req, res) =>  {
        const findUser = ModelDev.find({mail: req.body.mail})
        .then( userFind => {
            if(userFind.length ==0) { return res.status(400).json({"error" : "utilisateur non trouvé"})};
            if(REGEX_EMAIL.test(req.body.mail) === false) { return res.status(400).json({"error": "Email non valide"})};
            if(REGEX_PASSWORD.test(req.body.password) === false) { return res.status(400).json({"error": "Mot de passe non valide"})};
            bcrypt.compare(req.body.password, userFind.password)
            .then( result => {
                if(!result) { return res.status(400).json({"error" : "mot de passe incorrect"}) };
                res.status(200).json({
                    "userInfos": {
                        mail     : userFind.mail,
                        username : userFind.username
                    },
                    "token": token.sign({
                        userId : userFind._id,
                        },
                        process.env.TOKEN_CODE,
                        { expiresIn : '24h'}
                    )});
            })
            .catch( error => res.status(400).json(error));
        })
        .catch(error => res.status(400).json(error));
    }
}
