var jwt = require('jsonwebtoken');

module.exports = function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'ilovescotchyscotch', (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}