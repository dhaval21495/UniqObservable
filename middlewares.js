var verifyJWTToken = require('./auth.js');

module.exports = function verifyJWT_MW(req, res, next) {
    verifyJWTToken(req.headers.token)
        .then((decodedToken) => {
            req.user = decodedToken.data
            next()
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
                .json({
                    message: "Invalid auth token provided.",
                    is_logout: 1
                })
        })
}