const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('../utils/jwt.utils');
//Routes 

//regex

const EMAIL_REGEX =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/



module.exports = {
    register: (req,resp) => {
        const email = req.body.email;
        const picture = req.body.picture;
        const password = req.body.password;
        const username = req.body.username;
        

        if(email == null || picture == null || password == null || username == null) { 
            return resp.status(400).json({"error" : "il manque un element"})
        };
        if(!EMAIL_REGEX.test(email)) {
            return resp.status(400).json({"error" : "email non valide"})
        };
        if(!PASSWORD_REGEX.test(password)) {
            return resp.status(400).json({"error" : "password non valide"})
        };



        models.Dev.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then((userFind => {
            if(!userFind) {
                bcrypt.hash(password,5,(err, bcryptdPassword) => {
                    const newUser = models.Dev.create({
                        email: email,
                        username: username,
                        password: bcryptdPassword,
                        picture: picture,
                        isAdmin: 0
                    })
                    .then((newUser) => {
                        return resp.status(201).json({"user": newUser})
                    })
                    .catch((error) => {
                        resp.status(500).json({"error": "impossible d'ajouter l'utilisateur"})
                    })
                })

            } else {
                return resp.status(409).json({"error": "utilisateur existe déjà"})
            }

        }))
        .catch((error) => {
            return resp.status(500).json({"error": "Impossible de verifier"});
        })


        
    },
    login: (req,resp) => {
        const email = req.body.email;
        const password = req.body.password;

        if(email == null || password == null ) {
            return resp.status(400).json({"error" : "Remplir champ vide"})
        }
        
        models.Dev.findOne({
            attributes: ['email', 'password'],
            where: { email: email }
        })
        .then((userdata) => {
            if(userdata) {
                bcrypt.compare(password, userdata.password, (err, bcryptRes) => {
                    if(bcryptRes) {
                        return resp.status(200).json({
                            'userId' : userdata.id,
                            'token': jwt.createToken(userdata)
                        });
                    } else {
                        return resp.status(400).json({ "error": "mdp invalide"});
                    }
                })

            } else {
                resp.status(400).json({"error" : "utilisateur introuvable"})
            }
        })
        .catch((error) =>  {
            resp.status(500).json({"eeror": "impossible de se connecter"})
        })
    }
}