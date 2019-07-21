var mongoose = require("mongoose");
var Machine = require("../models/MachineMaster");
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

var machineController = {};

machineController.save = function (req, res) {
    var test = new Machine(req.body);
    test.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Machine inserted successfully",
                data: data,
            });
        }
    });
};

//  get all machine
machineController.list = function (req, res) {
    Machine.find({}, function (err, data) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                data
            });
        }
    }).sort({ _id: -1 });

};
// get CompanyMaster By ID
machineController.getMachineByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getMachine(id, getMachineCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: 'id'
        });
    }

    function getMachineCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Machine id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'Machine Data.',
                data: response.data
            });
        }
    }
};
function getMachine(id, callback) {
    Machine.findById(id, data);
    function data(err, data) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!data) {
            return callback({
                error: true,
                data: "Machine not found."
            });
        } else {
            return callback({
                error: false,
                data: data
            });
        }
    }
}


// update company mster
machineController.update = function (req, res) {
    var id = req.params.id;
    Machine.findByIdAndUpdate(id, req.body, (err, comapanymaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: comapanymaster
            });
        } else {
            res.status(200).json({
                message: "Machine has been updated successfully",
                data: comapanymaster
            });
        }
    });
};
// delete company master
machineController.delete = function (req, res) {
    Machine.remove({ _id: req.params.id }, function (err, comapanymaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: comapanymaster,
            });
        } else {
            return res.status(200).json({
                message: 'Machine has been deleted successfully',
                data: comapanymaster,
            });
        }
    });

};

module.exports = machineController;