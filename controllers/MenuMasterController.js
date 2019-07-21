var mongoose = require("mongoose");
var MenuMaster = require("../models/MenuMaster");
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

var menuMasterController = {};

menuMasterController.save = function (req, res) {
    var test = new MenuMaster(req.body);
    test.save(function (err, testData) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Menu master inserted successfully",
                data: testData,
            });
        }
    });
};

//  get all menu master
menuMasterController.list = function (req, res) {
    MenuMaster.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'Menu Master Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get menu Master By ID
menuMasterController.getMenuMasterByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        geMenuMaster(id, getMenuMasterCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getMenuMasterCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Menu master id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'Menu Master Data.',
                data: response.data
            });
        }
    }
};
function geMenuMaster(id, callback) {
    MenuMaster.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "Menu master not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update menu mster
menuMasterController.update = function (req, res) {
    var id = req.params.id;
    MenuMaster.findByIdAndUpdate(id, req.body, (err, menumaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: menumaster
            });
        } else {
            res.status(200).json({
                message: "Menu master has been updated successfully",
                data: menumaster
            });
        }
    });
};
// delete menu master
menuMasterController.delete = function (req, res) {
    MenuMaster.remove({ _id: req.params.id }, function (err, menumaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: menumaster,
            });
        } else {
            return res.status(200).json({
                message: 'Menu master has been deleted successfully',
                data: menumaster,
            });
        }
    });

};

module.exports = menuMasterController;