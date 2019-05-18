var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var cms = require('../controllers/CmsController.js');

module.exports = function (app) {
    // Login User
    app.get('/cms/list' ,function (req, res) {
        cms.list(req, res);
    });
}