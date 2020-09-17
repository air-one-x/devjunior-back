// IMPORT 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CompanyModel = require('../models/Company');
require('dotenv/config');

module.exports = {

    findAllUsers : (req, res) => {
        CompanyModel.find()
        .then(findAllUsers => {
            if(findAllUsers.length == 0) { return res.status(400).json({"error" : "Aucun utilisateur"})};
            res.status(200).json(findAllUsers);
        })
        .catch(error => res.status(400).json(error));
    },

    findOneUser : (req, res) => {
        CompanyModel.find({_id: req.params.id})
        .then(findUser => {
            if(findUser.length ==0) { return res.status(400).json({"error": "Aucun utilisateur"})};
            res.status(200).json(findUser);
        })
        .catch(error => res.status(400).json(error));
    },

    addUser : (req, res) => {
        CompanyModel.find({mail: req.body.mail})
        .then(findUser => {
            if(findUser != 0) { return res.status(400).json({"error":"Utilisateur existe déjà"})}
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = new CompanyModel({
                    username: req.body.username,
                    password: hash,
                    mail    : req.body.mail,
                })
                newUser.save()
                .then(saveUser => res.status(200).json(saveUser))
                .catch(dbError => res.status(400).json(dbError))
            })
            .catch(error => res.status(400).json(error));
        })
    },

    deleteUser: (req, res) => {
        CompanyModel.findByIdAndDelete(req.params.id)
        .then( result => {
            if(!result) { return res.status(400).json({"error": "Aucun utilisateur"})};
            res.status(200).json({"Validation": "Utilisateur supprimé"});
        })
        .catch(error => res.status(400).json(error));
    },

    updateUser: (req, res) => {
        CompanyModel.findByIdAndUpdate(req.params.id, req.body)
        .then( result => {
            if(!result) { return res.status(400).json({"error":"aucun utilisateur"})};
            res.status(200).json(result);
        })
        .catch(error => res.status(400).json(error))
    },

    login : (req, res) => {
        CompanyModel.find({mail: req.body.mail})
        .then( userFind => {
            if(userFind.length == 0 ) { return res.status(400).json({"error":"Aucun utilisateur"})};
            bcrypt.compare(req.body.password, userFind.password)
            .then( result => {
                if(!result) { return res.status(400).json({"error":"mauvais mot de passe"})};
                res.status(200).json({
                    "userInfos" : {
                        mail: userFind.mail,
                        sirene: userFind.sirene,
                        username: userFind.username
                    },
                    "token" : jwt.sign(
                            {userId: userFind._id},
                            process.env.TOKEN_CODE,
                            {expiresIn: '24h'}
                        )
                })
            })
            .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(400).json(error));
    }

}