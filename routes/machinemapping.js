var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var MachineMapping = require('../controllers/MachineMappingController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add machine mapping
    app.post('/machinemapping/addMachineMapping', function (req, res) {
        MachineMapping.save(req, res);
    });
    // get all machine mapping
    app.get('/machinemapping/allMachineMapping', function (req, res) {
        MachineMapping.list(req, res);
    });
    //  get machine mapping
    app.get('/machinemapping/getByID/:id', function (req, res) {
        MachineMapping.getMachineMappingByID(req, res);
    });
    // Get machine mapping update
    app.put('/machinemapping/update/:id', function (req, res) {
        MachineMapping.update(req, res);
    });
    // Get machine mapping delete
    app.delete('/machinemapping/delete/:id', function (req, res) {
        MachineMapping.delete(req, res);
    });

}