var mongoose = require("mongoose");
var Affiliations = require("../../models/Affiliation");

var AffiliationsController = {};

//Add view
AffiliationsController.add = function (req, res) {
    res.render('../views/affiliations/add', {
        message: '',
        title: 'Y List',
        name: 'Y List',
    });
};

// Save Affiliate
AffiliationsController.save = function (req, res) {
    var affiliations = new Affiliations(req.body);
    Affiliations.findOne({
        'affiliation_name': req.body.affiliation_name
    }, function (err, affiliation) {
        if (affiliation == null) {
            affiliations.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).json({
                        message: err,
                        data: '',
                    });
                } else {
                    res.status(200).json({
                        message: 'Affiliations has been added successfully',
                        data: affiliations,
                    });
                }
            });
        } else {
            res.status(400).json({
                message: 'Duplicate affiliations name',
                data: '',
            });
        }
    });
};

AffiliationsController.list = function (req, res) {
    Affiliations.find({}, function (err, affiliations) {
        //console.log(affiliations);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: affiliations,
            });
        } else {
            res.render('../views/affiliations/list', {
                affiliationsList: affiliations
            });
        }
    }).sort({
        _id: -1
    });

};

AffiliationsController.edit = function (req, res) {
    var affiliationId = req.params.id;
    Affiliations.findById(affiliationId, (err, entity) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.render('../views/affiliations/edit', {
                message: '',
                title: 'Y List',
                name: 'Y List',
                AffiliationData: entity
            });
        }
    });
};

// update Affiliation
AffiliationsController.update = function (req, res) {
    var affiliationId = req.params.id;
    Affiliations.findByIdAndUpdate(affiliationId, req.body, (err, entity) => {
        console.log(entity);
        if (err) {
            res.status(400).json({
                message: err,
                data: ''
            });
        } else {
            res.status(200).json({
                message: "Affiliation has been updated successfully",
                data: ''
            });
        }
    });
};





module.exports = AffiliationsController;