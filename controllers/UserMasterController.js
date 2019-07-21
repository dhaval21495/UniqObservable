var mongoose = require("mongoose");
var UserMaster = require("../models/UserMaster");
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

var userMasterController = {};

userMasterController.save = function (req, res) {
    var test = new UserMaster(req.body);
    test.save(function (err, testData) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "User master inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all user master
userMasterController.list = function (req, res) {
    UserMaster.find({}, function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'user Master Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get user Master By ID
userMasterController.getUserMasterByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getUserMaster(id, getUserMasterCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getUserMasterCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'user master id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'User Master Data.',
                data: response.data
            });
        }
    }
};
function getUserMaster(id, callback) {
    UserMaster.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "User master not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update user mster
userMasterController.update = function (req, res) {
    var id = req.params.id;
    UserMaster.findByIdAndUpdate(id, req.body, (err, usermaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: usermaster
            });
        } else {
            res.status(200).json({
                message: "User master has been updated successfully",
                data: usermaster
            });
        }
    });
};
// delete user master
userMasterController.delete = function (req, res) {
    UserMaster.remove({ _id: req.params.id }, function (err, usermaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: usermaster,
            });
        } else {
            return res.status(200).json({
                message: 'User master has been deleted successfully',
                data: usermaster,
            });
        }
    });

};

module.exports = userMasterController;