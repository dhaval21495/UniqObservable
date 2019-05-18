var host = require('../controllers/HostController.js');

module.exports = function (app) {
    // Login User
    app.get('/host/list', function (req, res) {
        host.list(req, res);
    });
    app.get('/host/mail', function (req, res) {
        host.mail(req, res);
    });
}