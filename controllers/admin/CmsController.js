var mongoose = require("mongoose");
var Cms = require("../../models/Cms");

var cmsController = {};

cmsController.list = function (req, res) {
    Cms.find({}, function (err, cms) {
        console.log(cms);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: cms,
            });
        } else {
            res.render('../views/cms/list', { cmsList: cms });
        }
    });

};

cmsController.edit = function (req, res) {
    var cmsId = req.params.id;
    Cms.findById(cmsId, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.render('../views/cms/edit', {
                message: '',
                title: 'Y List',
                name: 'Y List',
                CmsData: entity
            });
        }
    });
};

// update Cms
cmsController.update = function (req, res) {
    var cmsId = req.params.id;
    Cms.findByIdAndUpdate(cmsId, req.body, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.status(200).json({
                message: "Cms  has been updated successfully",
                data: ''
            });
        }
    });
};



module.exports = cmsController;
