var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var CompanyMaster = require('../controllers/CompanyMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add company master
    app.post('/companymaster/addCompanyMaster',verifyJWT_MW, function (req, res) {
        CompanyMaster.save(req, res);
    });
    // get all company master
    app.get('/companymaster/allCompanyMaster', function (req, res) {
        CompanyMaster.list(req, res);
    });
    //  get company master
    app.get('/companymaster/getByID/:id', function (req, res) {
        CompanyMaster.getCompanyMasterByID(req, res);
    });
    // Get company master update
    app.put('/companymaster/update/:id', function (req, res) {
        CompanyMaster.update(req, res);
    });
    // Get company master delete
    app.delete('/companymaster/delete/:id', function (req, res) {
        CompanyMaster.delete(req, res);
    });

}