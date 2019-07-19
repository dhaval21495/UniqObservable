var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var CodeTypeMaster = require('../controllers/CodeTypeMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add code master
    app.post('/codetypemaster/addCodeTypeMaster', function (req, res) {
        CodeTypeMaster.save(req, res);
    });
    // get all code master
    app.get('/codetypemaster/allCodeTypeMaster', function (req, res) {
        CodeTypeMaster.list(req, res);
    });
    //  get code master
    app.get('/codetypemaster/getByID/:id', function (req, res) {
        CodeTypeMaster.getCodeTypeMasterByID(req, res);
    });
    // Get code master update
    app.put('/codetypemaster/update/:id', function (req, res) {
        CodeTypeMaster.update(req, res);
    });
    // Get code master delete
    app.delete('/codetypemaster/delete/:id', function (req, res) {
        CodeTypeMaster.delete(req, res);
    });
}