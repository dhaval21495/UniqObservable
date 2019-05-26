var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var UserMaster = require('../controllers/UserMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add user master
    app.post('/usermaster/addUserMaster', function (req, res) {
        UserMaster.save(req, res);
    });
    // get all user master
    app.get('/usermaster/allUserMaster', function (req, res) {
        UserMaster.list(req, res);
    });
    //  get user master
    app.get('/usermaster/getByID/:id', function (req, res) {
        UserMaster.getUserMasterByID(req, res);
    });
    // Get user master update
    app.put('/usermaster/update/:id', function (req, res) {
        UserMaster.update(req, res);
    });
    // Get user master delete
    app.delete('/usermaster/delete/:id', function (req, res) {
        UserMaster.delete(req, res);
    });

}