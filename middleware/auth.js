const token = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next ) => {

    try {
        const jwtToken = req.headers.authorization.split(' ')[1];
        const decodeToken = token.verify(jwtToken, process.env.TOKEN_CODE);
        const userId = decodeToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserId non valide'
        } else {
            next();
        }

    } catch(error) {
        res.status(400).json(error);
    }

};