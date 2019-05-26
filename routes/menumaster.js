var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var MenuMaster = require('../controllers/MenuMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add menu master
    app.post('/menumaster/addMenuMaster', function (req, res) {
        MenuMaster.save(req, res);
    });
    // get all menu master
    app.get('/menumaster/allMenuMaster', function (req, res) {
        MenuMaster.list(req, res);
    });
    //  get menu master
    app.get('/menumaster/getByID/:id', function (req, res) {
        MenuMaster.getMenuMasterByID(req, res);
    });
    // Get menu master update
    app.put('/menumaster/update/:id', function (req, res) {
        MenuMaster.update(req, res);
    });
    // Get menu master delete
    app.delete('/menumaster/delete/:id', function (req, res) {
        MenuMaster.delete(req, res);
    });

}