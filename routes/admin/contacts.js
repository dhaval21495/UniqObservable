var verifyJWT_MW = require('../../middlewares.js');
var paramCheck = require('../../middlewares');
var contact = require('../../controllers/admin/ContactsController.js');
var checkAdminLogin = require('../../config/session');

module.exports = function (app) {
    // Save contact
    app.post('/contact/save', checkAdminLogin, function (req, res) {
        cms.save(req, res);
    });

    // contact list
    app.get('/admin/contact/list', checkAdminLogin, function (req, res) {
        contact.list(req, res);
    });

    // delete contact
    app.post('/admin/contact/delete/', checkAdminLogin, function (req, res) {
        contact.delete(req, res);
    });

    // Contact view
    app.get('/admin/contact/view/:id', function (req, res) {
        contact.view(req, res);
    });

}