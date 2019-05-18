var mongoose = require("mongoose");
var Affiliation = require("../models/Affiliation");

var affiliationController = {};

// Show list of employees
affiliationController.list = function (req, res) {
    Affiliation.find({
        'status': true
    }).exec(function (err, affiliation) {
        if (err) {
            res.status(400).json({
                message: err,
                data: affiliation,
            });
        } else {
            res.status(200).json({
                message: 'Affiliation List',
                data: affiliation,
            });
        }
    });
};

module.exports = affiliationController;