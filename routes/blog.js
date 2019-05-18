var blog = require('../controllers/BlogController.js');

module.exports = function (app) {
    // Login User
    app.get('/blog/list', function (req, res) {
        blog.list(req, res);
    });
}