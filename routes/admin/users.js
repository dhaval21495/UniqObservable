var verifyJWT_MW = require('../../middlewares.js');
var paramCheck = require('../../middlewares');
var checkAdminLogin = require('../../config/session');
var users = require('../../controllers/admin/UserController.js');

module.exports = function (app) {
    // Save user
    app.post('/admin/users/save', checkAdminLogin, function (req, res) {
        users.save(req, res);
    });

    // delete user
    app.post('/admin/users/delete/', checkAdminLogin, function (req, res) {
        users.delete(req, res);
    });

    // Users list
    app.get('/admin/users/list', checkAdminLogin, function (req, res) {
        users.list(req, res);
    });

    // add new User
    app.get('/admin/users/add', checkAdminLogin, function (req, res) {
        users.add(req, res);
    });

    // Edit User
    app.get('/admin/users/edit/:id', checkAdminLogin, function (req, res) {
        users.edit(req, res);
    });

    // Edit User profile (who ever is logged in )
    app.get('/admin/users/profile/', checkAdminLogin, function (req, res) {
        users.profile(req, res);
    });

    // Change Password (who ever is logged in )
    app.get('/admin/users/changePassword/', checkAdminLogin, function (req, res) {
        users.changePassword(req, res);
    });

    //checkOldPassword
    app.post('/admin/users/checkOldPassword', function (req, res) {
        users.checkOldPassword(req, res);
    });

    app.post('/admin/users/UpdatePassword', function (req, res) {
        users.changeUserPassword(req, res);
    });

    // Get User Match detail
    app.get('/admin/users/detail/:id', checkAdminLogin, function (req, res) {
        users.detail(req, res);
    });

    app.post('/admin/users/update/:id', checkAdminLogin, function (req, res) {
        users.updateUser(req, res);
    });

    app.post('/admin/users/change-status', checkAdminLogin, function (req, res) {
        users.changeStatus(req, res);
    });

    app.post('/admin/users/change-block-unblock', checkAdminLogin, function (req, res) {
        users.blockUnblockUser(req, res);
    });

    app.get('/admin/users/report', checkAdminLogin, function (req, res) {
        users.userReport(req, res);
    });

    app.get("/admin/report/view/:id", checkAdminLogin, function(req, res) {
      users.viewReport(req, res);
    });

    app.get("/admin/report/delete/:id", checkAdminLogin, function(req, res) {
      users.deleteReport(req, res);
    });
}