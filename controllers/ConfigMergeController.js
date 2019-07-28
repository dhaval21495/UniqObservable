var mongoose = require("mongoose");
var ConfigMerge = require("../models/ConfigMerge");
var Matches = require("../models/Matches");
var Reportuser = require("../models/Reportuser");
const main_ids = require('../config/email_id');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var multer = require('multer');
var lodash = require('lodash');
var moment = require('moment');
var fs = require('fs');

var configMergeController = {};

configMergeController.save = function (req, res) {
    var test = new ConfigMerge(req.body);
    test.save(function (err, testData) {
        if (err) {
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Config merege inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all Config merege
configMergeController.list = function (req, res) {
    ConfigMerge.find({}, function (err, data) {
        console.log(err);
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Config merege Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get Config merege By ID
configMergeController.getConfigMergeByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getConfigMerge(id, getConfigMergeCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getConfigMergeCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Config merege id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'Config merege Data.',
                data: response.data
            });
        }
    }
};
function getConfigMerge(id, callback) {
    ConfigMerge.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "Config merege not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update Config merege
configMergeController.update = function (req, res) {
    var id = req.params.id;
    ConfigMerge.findByIdAndUpdate(id, req.body, (err, configmerge) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: configmerge
            });
        } else {
            res.status(200).json({
                message: "Config merege has been updated successfully",
                data: configmerge
            });
        }
    });
};
// delete Config merege
configMergeController.delete = function (req, res) {
    ConfigMerge.remove({ _id: req.params.id }, function (err, configmerge) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: configmerge,
            });
        } else {
            return res.status(200).json({
                message: 'Config merege has been deleted successfully',
                data: configmerge,
            });
        }
    });

};

module.exports = configMergeController;