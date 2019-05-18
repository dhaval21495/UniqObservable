var verifyJWT_MW = require('../middlewares.js');
var paramCheck = require('../middlewares');
var matches = require('../controllers/MatchesController.js');

module.exports = function (app) {
    // Matches Like
    app.post('/matches/matches', function (req, res) {
        matches.matchesLike(req, res);
    });

    // Matches DisLike
    app.post('/matches/dis-like', verifyJWT_MW, function (req, res) {
        matches.matchesDisLike(req, res);
    });
}