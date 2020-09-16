//IMPORT
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');

const ModelUser = require('../models/Users');
require('dotenv/config');


module.exports = {

    findOneUser : (req, res) => {
        const findUser = ModelUser.find({_id: req.params.id })
        .then( result => res.status(200).json(result))
        .catch( error => res.status(400).json(error));
    },

    findAllUsers : (req, res) => {
        const usersList = ModelUser.find()
         .then( result => res.status(200).json(result))
         .catch(error  => res.status(400).json({"error" : error}));
    },

    addNewUser : (req,res) => {
        ModelUser.find({mail: req.body.mail})
        .then( result => {
            if(result.length != 0) { return res.status(400).json({"error": "mail existe déjà"})};
            bcrypt.hash(req.body.password,10)
            .then( hash => {
                const newUser = new ModelUser({
                    mail     : req.body.mail,
                    username : req.body.username,
                    password : hash
                });
                newUser.save()
                .then( saveUser => res.status(200).json(saveUser))
                .catch( error => res.status(400).json(error));
            })
            .catch( error => res.status(400).json(error))
        })
    },

    deleteUser : (req, res) => {
        const findUser = ModelUser.findByIdAndDelete(req.params.id)
        .then( result => {
            res.status(200).json({"Validation" : "Utilisateur supprimé"})
        })
        .catch( error => {
            res.status(400).json({"error": error});
        });
    },

    updateUser : (req, res) => {
        const findUser = ModelUser.findByIdAndUpdate(req.params.id, req.body)
        .then( result => {
            res.status(200).json({"validation" : "Modification OK"});
        })
        .catch( error => {
            res.status(400).json(error);
        });
    },

    login : (req, res) =>  {
        const findUser = ModelUser.findOne({mail: req.body.mail})
        .then( userFind => {
            if(userFind == null) { return res.status(400).json({"error" : "utilisateur non trouvé"})};
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
