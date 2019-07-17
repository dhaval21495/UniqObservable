var mongoose = require("mongoose");
var RoleMenu = require("../models/RoleMenu");
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

var roleMenuController = {};

roleMenuController.save = function (req, res) {
    var test = new RoleMenu(req.body);
    test.save(function (err, testData) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Role menu inserted succesfully",
                data: testData,
            });
        }
    });
};

//  get role menu master
roleMenuController.list = function (req, res) {
    RoleMenu.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Role menu Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get role menu By ID
roleMenuController.getRoleMenuByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getRoleMenu(id, getRoleMenuCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getRoleMenuCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Role menu id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'Role menu Data.',
                data: response.data
            });
        }
    }
};
function getRoleMenu(id, callback) {
    RoleMenu.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "Role menu not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}

// update role menu
roleMenuController.update = function (req, res) {
    var id = req.params.id;
    RoleMenu.findByIdAndUpdate(id, req.body, (err, rolemenu) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: rolemenu
            });
        } else {
            res.status(200).json({
                message: "Role menu has been updated successfully",
                data: rolemenu
            });
        }
    });
};
// delete role menu
roleMenuController.delete = function (req, res) {
    RoleMenu.remove({ _id: req.params.id }, function (err, rolemenu) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: rolemenu,
            });
        } else {
            return res.status(200).json({
                message: 'Role menu has been deleted successfully',
                data: rolemenu,
            });
        }
    });

};

module.exports = roleMenuController;