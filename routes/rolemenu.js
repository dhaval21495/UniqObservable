var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var RoleMenu = require('../controllers/RoleMenuController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add role menu
    app.post('/rolemenu/addRoleMenu', function (req, res) {
        RoleMenu.save(req, res);
    });
    // get role all menu
    app.get('/rolemenu/allRoleMenu', function (req, res) {
        RoleMenu.list(req, res);
    });
    // get role menu
    app.get('/rolemenu/getByID/:id', function (req, res) {
        RoleMenu.getRoleMenuByID(req, res);
    });
    // get role menu update
    app.put('/rolemenu/update/:id', function (req, res) {
        RoleMenu.update(req, res);
    });
    // get role menu delete
    app.delete('/rolemenu/delete/:id', function (req, res) {
        RoleMenu.delete(req, res);
    });

}