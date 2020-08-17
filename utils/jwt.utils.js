const jwt = require('jsonwebtoken');

const JWT_SIGN = "dfg615@@sdf5d55f5qzalbf54984s1dg@@@sdgds5sdfsg5";

module.exports = {
    createToken: (user) => {
        return jwt.sign(
        {
            userId: user.id,
            isAdmin: user.isAdmin
        },
        JWT_SIGN,
        {
            expiresIn: "24h"

        }
        )
    }
}