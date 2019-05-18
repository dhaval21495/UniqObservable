var users = require('../controllers/ContactusController.js');

module.exports = function (app) {
    // Save user
    app.post('/contactus/send', function (req, res) {
        users.send(req, res);
    });
}