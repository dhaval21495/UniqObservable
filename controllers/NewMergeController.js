var mongoose = require("mongoose");
var NewMerge = require("../models/NewMerge");
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

var newMergeController = {};

newMergeController.save = function (req, res) {
    var test = new NewMerge(req.body);
    test.save(function (err, testData) {
        if (err) {
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "New merge inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all New merge
newMergeController.list = function (req, res) {
    NewMerge.find({}, function (err, data) {
        console.log(err);
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'New merge Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get Config merge By ID
newMergeController.getNewMergeByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getNewMerge(id, getNewMergeCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getNewMergeCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'New merge id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'New merge Data.',
                data: response.data
            });
        }
    }
};
function getNewMerge(id, callback) {
    NewMerge.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "New merge not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update New merge
newMergeController.update = function (req, res) {
    var id = req.params.id;
    NewMerge.findByIdAndUpdate(id, req.body, (err, newmerge) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: newmerge
            });
        } else {
            res.status(200).json({
                message: "New merge has been updated successfully",
                data: newmerge
            });
        }
    });
};
// delete New merge
newMergeController.delete = function (req, res) {
    NewMerge.remove({ _id: req.params.id }, function (err, newmerge) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: newmerge,
            });
        } else {
            return res.status(200).json({
                message: 'New merge has been deleted successfully',
                data: newmerge,
            });
        }
    });

};

module.exports = newMergeController;