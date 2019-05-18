var verifyJWT_MW = require('../../middlewares.js');
var paramCheck = require('../../middlewares');
var blogs = require('../../controllers/admin/BlogsController.js');
var checkAdminLogin = require('../../config/session');

module.exports = function (app) {
    // Save blogs
    app.post('/admin/blogs/save', checkAdminLogin, function (req, res) {
        blogs.save(req, res);
    });

    // Users list
    app.get('/admin/blogs/list', checkAdminLogin, function (req, res) {
        blogs.list(req, res);
    });

    // delete blog
    app.post('/admin/blogs/delete/', checkAdminLogin, function (req, res) {
        blogs.delete(req, res);
    });

    // add new blog
    app.get('/admin/blogs/add', checkAdminLogin, function (req, res) {
        blogs.add(req, res);
    });

    // GET Edit blog
    app.get('/admin/blogs/edit/:id', checkAdminLogin, function (req, res) {
        blogs.edit(req, res);
    });

    // GET update blog
    app.post('/admin/blogs/update/:id', checkAdminLogin, function (req, res) {
        blogs.update(req, res);
    });


}