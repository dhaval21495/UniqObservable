var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var users = require('../controllers/UserController.js');
var CompanyMaster = require('../controllers/CompanyMasterController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.get('/users/get-user/:id', verifyJWT_MW, function (req, res) {
        users.geCompanyMasterByID(req, res);
    });
    // Save user
    app.post('/users/save', function (req, res) {
        users.save(req, res);
    });

    // confirm user
    app.get('/users/confirm/:time/:id', function (req, res) {
        users.confirm(req, res);
    });

    // Change Password
    app.post('/users/change-password/:id', verifyJWT_MW, function (req, res) {
        users.changePassword(req, res);
    });

    // Get Auth User Profile
    app.get('/users/get-user/:id', verifyJWT_MW, function (req, res) {
        users.getUserByUserID(req, res);
    });

    // Update Profile
    app.post('/users/update-profile/:id', verifyJWT_MW, function (req, res) {
        users.update(req, res);
    });

    // Get User Detail
    app.post('/users/update-details/:id', verifyJWT_MW, function (req, res) {
        users.update(req, res);
    });

    // Get All User
    app.post('/users/getAllUser/:id', verifyJWT_MW, function (req, res) {
        users.getAllUser(req, res);
    });

    //
    app.get('/users/get-user/:user_id/:matches_id', verifyJWT_MW, function (req, res) {
        users.getUserDetailByUserID(req, res);
    });

    app.get('/users/log-out/:id', function (req, res) {
        users.logOut(req, res);
    });

    app.post("/users/report-user", verifyJWT_MW, function(req, res) {
        users.reportUser(req, res);  
    });
}