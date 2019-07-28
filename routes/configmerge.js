var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var ConfigMerge = require('../controllers/ConfigMergeController');
var cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    // add config merge
    app.post('/configmerge/addConfigMerge', function (req, res) {
        ConfigMerge.save(req, res);
    });
    // get all config merge
    app.get('/configmerge/allConfigMergeg', function (req, res) {
        ConfigMerge.list(req, res);
    });
    //  get config merge
    app.get('/configmerge/getByID/:id', function (req, res) {
        ConfigMerge.getConfigMergeByID(req, res);
    });
    // Get config merge update
    app.put('/configmerge/update/:id', function (req, res) {
        ConfigMerge.update(req, res);
    });
    // Get config merge delete
    app.delete('/configmerge/delete/:id', function (req, res) {
        ConfigMerge.delete(req, res);
    });

}