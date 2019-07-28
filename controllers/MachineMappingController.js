var mongoose = require("mongoose");
var MachineMapping = require("../models/MachineMapping ");
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

var mappingMappingController = {};

mappingMappingController.save = function (req, res) {
    var test = new MachineMapping(req.body);
    test.save(function (err, testData) {
        if (err) {
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Machine mapping inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all Machine mapping
mappingMappingController.list = function (req, res) {
    MachineMapping.find({}, function (err, data) {
        console.log(err);
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Machine mapping Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get Machine mapping By ID
mappingMappingController.getMachineMappingByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getMachineMapping(id, getMachineMappingCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getMachineMappingCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Machine mapping id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'Machine mapping Data.',
                data: response.data
            });
        }
    }
};
function getMachineMapping(id, callback) {
    MachineMapping.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "Machine mapping not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update Machine mapping
mappingMappingController.update = function (req, res) {
    var id = req.params.id;
    MachineMapping.findByIdAndUpdate(id, req.body, (err, machinemapping) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: machinemapping
            });
        } else {
            res.status(200).json({
                message: "Machine mapping has been updated successfully",
                data: machinemapping
            });
        }
    });
};
// delete Machine mapping
mappingMappingController.delete = function (req, res) {
    MachineMapping.remove({ _id: req.params.id }, function (err, machinemapping) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: machinemapping,
            });
        } else {
            return res.status(200).json({
                message: 'Machine mapping has been deleted successfully',
                data: machinemapping,
            });
        }
    });

};

module.exports = mappingMappingController;