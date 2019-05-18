var admin = require('../../controllers/admin/AuthController.js');

module.exports = function (app) {
    app.get('/admin/login', function (req, res) {
        admin.login(req, res);
    });

    app.post('/admin/login', function (req, res) {
        admin.loginUser(req, res);
    });

    app.get('/admin/logout', function (req, res) {
        admin.logoutUser(req, res);
    });

    app.get('/admin/forgot-password', function(req,res){
    	admin.forgotePassword(req, res);
    });

    app.post('/admin/forgot-password', function(req,res){
    	admin.adminForgotePassword(req, res);
    });

    app.get('/admin/change-password/:time/:id', function(req, res){
    	admin.adminchangePassword(req, res);
    });
    
    app.post('/admin/change-password', function(req, res){
    	admin.changePassword(req, res);
    });
}