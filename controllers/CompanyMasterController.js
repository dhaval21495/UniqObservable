var mongoose = require("mongoose");
var CompanyMaster = require("../models/Companymaster");
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

var companyMasterController = {};

companyMasterController.save = function (req, res) {
    var test = new CompanyMaster(req.body);
    test.save(function (err, testData) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err,
                data: '',
            });
        } else {
            res.status(200).json({
                message: "Company master inserted succesfully",
                data: testData,
            });
        }
    });
};

//  get all company master
companyMasterController.list = function (req, res) {
    CompanyMaster.find({}, function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Error',
                data: data,
            });
        } else {
            res.status(200).json({
                message: 'company Master Data.',
                data: data
            });
        }
    }).sort({ _id: -1 });

};
// get CompanyMaster By ID
companyMasterController.getCompanyMasterByID = function (req, res) {
    var id = req.params.id || null;
    if (id) {
        getCompanatMaster(id, getCompanyMasterCallBack);
    } else {
        res.status(400).json({
            message: 'id required.',
            data: ''
        });
    }

    function getCompanyMasterCallBack(response) {
        if (response.error) {
            res.status(400).json({
                message: 'Company master id required.',
                data: ''
            });
        } else {
            res.status(200).json({
                message: 'company Master Data.',
                data: response.data
            });
        }
    }
};
function getCompanatMaster(id, callback) {
    CompanyMaster.findById(id, test);
    function test(err, test) {
        if (err) {
            return callback({
                error: true,
                data: err
            });
        } else if (!test) {
            return callback({
                error: true,
                data: "Company master not found."
            });
        } else {
            return callback({
                error: false,
                data: test
            });
        }
    }
}


// update company mster
companyMasterController.update = function (req, res) {
    var id = req.params.id;
    CompanyMaster.findByIdAndUpdate(id, req.body, (err, comapanymaster) => {
        if (err) {
            res.status(400).json({
                message: err,
                data: comapanymaster
            });
        } else {
            res.status(200).json({
                message: "comapany master has been updated successfully",
                data: comapanymaster
            });
        }
    });
};
// delete company master
companyMasterController.delete = function (req, res) {
    CompanyMaster.remove({ _id: req.params.id }, function (err, comapanymaster) {
        if (err) {
            return res.status(400).json({
                message: 'Error',
                data: comapanymaster,
            });
        } else {
            return res.status(200).json({
                message: 'comapnay master has been deleted successfully',
                data: comapanymaster,
            });
        }
    });

};

module.exports = companyMasterController;