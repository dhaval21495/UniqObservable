var users = require('../controllers/AuthController.js');

module.exports = function (app) {
    // Login User
    app.post('/users/login', function (req, res) {
        users.login(req, res); 
    });

    // Forgote Password
    app.post('/users/forgot-password', function (req, res) {
        users.forgotPassword(req, res);
    });

    // Change Password
    app.post('/users/change-password/:time/:id', function (req, res) {
        users.changePassword(req, res);
    });
}