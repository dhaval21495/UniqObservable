var mongoose = require("mongoose");
var Cms = require("../models/Cms");

var cmsController = {};

cmsController.list = function (req, res) {
    Cms.findOne({
            status: true,
        })
        .sort({
            created_at: -1
        })
        .exec(function (err, cms) {
            if (err) {
                res.status(400).json({
                    message: 'cms not found',
                    data: '',
                });
            } else {
                res.status(200).json({
                    message: 'cms list',
                    data: cms,
                });
            }
        });
};

module.exports = cmsController;