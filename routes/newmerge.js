var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var NewMerge = require('../controllers/NewMergeController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add new merge
    app.post('/newmerge/addNewMerge', function (req, res) {
        NewMerge.save(req, res);
    });
    // get all new merge
    app.get('/newmerge/allNewMerge', function (req, res) {
        NewMerge.list(req, res);
    });
    //  get new merge
    app.get('/newmerge/getByID/:id', function (req, res) {
        NewMerge.getNewMergeByID(req, res);
    });
    // Get new merge update
    app.put('/newmerge/update/:id', function (req, res) {
        NewMerge.update(req, res);
    });
    // Get new merge delete
    app.delete('/newmerge/delete/:id', function (req, res) {
        NewMerge.delete(req, res);
    });

}