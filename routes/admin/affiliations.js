var affiliations = require('../../controllers/admin/AffiliationsController.js');
var checkAdminLogin = require('../../config/session');

module.exports = function (app) {
    // Get affiliation
    app.get('/admin/affiliations/list', checkAdminLogin, function (req, res) {
        affiliations.list(req, res);
    });

    // Edit affiliation
    app.get('/admin/affiliations/edit/:id', checkAdminLogin, function (req, res) {
        affiliations.edit(req, res);
    });

    // GET update affiliation
    app.post('/admin/affiliations/update/:id', checkAdminLogin, function (req, res) {
        affiliations.update(req, res);
    });

     // Save affiliations
     app.post('/admin/affiliations/save',function (req, res) {
        console.log("here");
        affiliations.save(req, res);
    });

    // add new affiliations
    app.get('/admin/affiliations/add', function (req, res) {
        affiliations.add(req, res);
    });
}