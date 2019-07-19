var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var CodeMaster = require('../controllers/CodeMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add code master
    app.post('/codemaster/addCodeMaster', function (req, res) {
        CodeMaster.save(req, res);
    });
    // get all code master
    app.get('/codemaster/allCodeMaster', function (req, res) {
        CodeMaster.list(req, res);
    });
    //  get code master
    app.get('/codemaster/getByID/:id', function (req, res) {
        CodeMaster.getCodeMasterByID(req, res);
    });
    // Get code master update
    app.put('/codemaster/update/:id', function (req, res) {
        CodeMaster.update(req, res);
    });
    // Get code master delete
    app.delete('/codemaster/delete/:id', function (req, res) {
        CodeMaster.delete(req, res);
    });
}