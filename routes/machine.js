var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var Machine = require('../controllers/MachineController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add test method
    app.post('/machineMaster/addMachine', function (req, res) {
        Machine.save(req, res);
    });
    //  get all machine
    app.get('/machineMaster/allMachine', function (req, res) {
        Machine.list(req, res);
    });
    //  get machine
    app.get('/machineMaster/getByID/:id', function (req, res) {
        Machine.getMachineByID(req, res);
    });
    // Get machine update
    app.put('/machineMaster/update/:id', function (req, res) {
        Machine.update(req, res);
    });
    // Get machine delete
    app.delete('/machineMaster/delete/:id', function (req, res) {
        Machine.delete(req, res);
    });
}