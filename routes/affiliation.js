var affiliation = require('../controllers/AffiliationController.js');

module.exports = function (app) {
    // Get affiliation
    app.get('/affiliation/get-affiliation', function (req, res) {
        affiliation.list(req, res);
    });
}