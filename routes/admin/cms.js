var verifyJWT_MW = require('../../middlewares.js');
var paramCheck = require('../../middlewares');
var cms = require('../../controllers/admin/CmsController.js');
var checkAdminLogin = require('../../config/session');

module.exports = function (app) {
    // Save cms
    app.post('/cms/save', checkAdminLogin, function (req, res) {
        cms.save(req, res);
    });

    // CMS list
    app.get('/admin/cms/list', checkAdminLogin, function (req, res) {
        cms.list(req, res);
    });

    // Edit CMS
    app.get('/admin/cms/edit/:id', checkAdminLogin, function (req, res) {
        cms.edit(req, res);
    });

    // POST update CMS
    app.post('/admin/cms/update/:id', checkAdminLogin, function (req, res) {
        cms.update(req, res);
    });
}